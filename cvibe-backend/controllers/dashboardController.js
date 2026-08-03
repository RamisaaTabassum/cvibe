const CV = require("../models/CV");
const User = require("../models/User");

// 1. User Dashboard (Individual User Stats)
const getDashboard = async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .lean();

    const totalDownloads = cvs.reduce(
      (sum, cv) => sum + (Number(cv.downloadCount || cv.downloads) || 0),
      0
    );

    const bestScore =
      cvs.length > 0
        ? Math.max(...cvs.map(cv => Number(cv.atsScore || cv.qualityScore || cv.score) || 0))
        : 0;

    const totalAiUses = cvs.reduce(
      (sum, cv) => sum + (Number(cv.aiUses) || 0),
      0
    );

    const statsPayload = {
      cvsCreated: cvs.length,
      downloads: totalDownloads,
      aiUses: totalAiUses,
      bestScore: bestScore,
      lastUpdated: cvs[0]?.updatedAt || null,
    };

    return res.status(200).json({
      success: true,
      stats: statsPayload,
      data: statsPayload,
      cvs,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
      error: error.message,
    });
  }
};

// 2. Admin Dashboard (Site-Wide System Stats)
const getAdminDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalCVs, allCvs, recentUsers] = await Promise.all([
      User.countDocuments(),
      CV.countDocuments(),
      CV.find().select('downloadCount downloads aiUses').lean(),
      User.find({ role: { $ne: 'admin' } })
        .select('name email createdAt status role')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
    ]);

    const totalDownloads = allCvs.reduce(
      (sum, cv) => sum + (Number(cv.downloadCount || cv.downloads) || 0),
      0
    );

    // 🟢 Exact sum without double-counting aiUsed boolean
    const totalAiUses = allCvs.reduce(
      (sum, cv) => sum + (Number(cv.aiUses) || 0),
      0
    );

    return res.status(200).json({
      success: true,
      totalUsers,
      totalCVs,
      cvsCreated: totalCVs,
      totalDownloads,
      downloads: totalDownloads,
      totalAiUses,
      aiUses: totalAiUses,
      recentUsers,
    });
  } catch (error) {
    console.error("Admin Dashboard error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard stats.",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
  getAdminDashboardStats,
};