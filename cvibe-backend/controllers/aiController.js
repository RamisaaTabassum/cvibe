const { GoogleGenAI, Type } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const extractKeywords = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

    // GoogleGenAI SDK-er dynamic structure configuration matching responseSchema runtime setup
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Model production pipeline verification check parameters update (Use standard model strings)
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

    // config data auto parsing format runtime structure handle kore dynamically mapping
    const keywords = JSON.parse(response.text);
    return res.json({ success: true, keywords });

  } catch (error) {
    return res.status(500).json({ message: 'AI error: ' + error.message });
  }
};

const fixGrammar = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Text content is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Fix the grammar and improve the professional tone of this CV/resume text. Return ONLY the improved text, with no introduction, no markdown, and no explanation. Text: ${text}`,
    });

    return res.json({ success: true, improved: response.text.trim() });
  } catch (error) {
    return res.status(500).json({ message: 'AI error: ' + error.message });
  }
};

module.exports = { extractKeywords, fixGrammar };