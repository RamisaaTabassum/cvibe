const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });


const extractKeywords = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

    const prompt = `
      Extract the most important keywords from this job description for a CV/resume.
      Return ONLY a JSON array of strings, no explanation.
      Example: ["React", "Node.js", "MongoDB", "REST API"]
      
      Job Description: ${jobDescription}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const cleaned = text.replace(/```json|```/g, '').trim();
    const keywords = JSON.parse(cleaned);

    res.json({ success: true, keywords });
  } catch (error) {
    res.status(500).json({ message: 'AI error: ' + error.message });
  }
};

// CV text grammar fix করো
const fixGrammar = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Enter text to improve' });
    }

    const prompt = `
      Fix the grammar and improve the professional tone of this CV text.
      Return ONLY the improved text, no explanation or extra formatting.
      
      Text: ${text}
    `;

    const result = await model.generateContent(prompt);
    const improved = result.response.text().trim();

    res.json({ success: true, improved });
  } catch (error) {
    res.status(500).json({ message: 'AI error: ' + error.message });
  }
};

module.exports = { extractKeywords, fixGrammar };