const CV = require('../models/CV');

const getDashboard = async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('title template createdAt updatedAt');

    const stats = {
      totalCVs: cvs.length,
      lastUpdated: cvs[0]?.updatedAt || null,
    };

    res.json({ success: true, stats, cvs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };