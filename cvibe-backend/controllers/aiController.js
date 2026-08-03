const { GoogleGenAI, Type } = require('@google/genai');

const CV = require('../models/CV');
const User = require('../models/User');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const trackBackendAiUse = async (cvId, userId) => {
  try {
    if (cvId) {
      await CV.findByIdAndUpdate(cvId, {
        $set: { aiUsed: true },$inc: { aiUses: 1 }
      });
    }
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $inc: { aiUses: 1 }
      });
    }
  } catch (err) {
    console.error('Failed to update AI usage stats in DB:', err.message);
  }
};

const extractKeywords = async (req, res) => {
  try {
    const { jobDescription, cvId } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',  
      contents: `Extract the most important technical and soft keywords from this job description for a CV/resume. Job Description: ${jobDescription}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          },
          description: "List of extracted skills and keywords."
        }
      }
    });

    let rawText = response.text ? response.text.trim() : '[]';
    if (rawText.startsWith('```')) {
      rawText = rawText.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
    }

    const keywords = JSON.parse(rawText);

    await trackBackendAiUse(cvId, req.user?.id || req.user?._id);

    return res.json({ success: true, keywords });

  } catch (error) {
    console.error('Extract keywords error:', error);
    return res.status(500).json({ message: 'AI error: ' + error.message });
  }
};

const fixGrammar = async (req, res) => {
  try {
    const { text, cvId } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Text content is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Fix the grammar and improve the professional tone of this CV/resume text. Return ONLY the improved text, with no introduction, no markdown, and no explanation. Text: ${text}`,
    });

    const improved = response.text ? response.text.trim() : text;

    await trackBackendAiUse(cvId, req.user?.id || req.user?._id);

    return res.json({ success: true, improved });
  } catch (error) {
    console.error('Fix grammar error:', error);
    return res.status(500).json({ message: 'AI error: ' + error.message });
  }
};

module.exports = { extractKeywords, fixGrammar };