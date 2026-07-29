const CV = require("../models/Cv");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  try {
    const [cvs, user] = await Promise.all([
      CV.find({ user: req.user.id })
        .sort({ updatedAt: -1 })
        .lean(),

      User.findById(req.user.id).lean(),
    ]);

    const totalDownloads = cvs.reduce(
      (sum, cv) => sum + (cv.downloadCount || cv.downloads || 0),
      0
    );

    const bestScore =
      cvs.length > 0
        ? Math.max(...cvs.map(cv => cv.atsScore || cv.qualityScore || cv.score || 0))
        : 0;

    const totalAiUsesFromCvs = cvs.reduce(
      (sum, cv) => sum + (cv.aiUses || (cv.aiUsed ? 1 : 0)),
      0
    );
    const aiUses = user?.aiUses ?? totalAiUsesFromCvs;

    res.status(200).json({
      success: true,
      stats: {
        cvsCreated: cvs.length,
        downloads: totalDownloads,
        aiUses: aiUses,
        bestScore: bestScore,
        lastUpdated: cvs[0]?.updatedAt || null,
      },
      cvs,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};