const User = require("../models/User");
const CV = require("../models/Cv");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -__v")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Get All CVs
const getAllCVs = async (req, res) => {
  try {
    const cvs = await CV.find()
      .populate({
        path: "user",
        select: "name email",
      })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      total: cvs.length,
      cvs,
    });
  } catch (error) {
    console.error("Get CVs Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch CVs",
      error: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (req.user && req.user.id === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Prevent deleting another admin
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be deleted.",
      });
    }

    // Delete user's CVs
    await CV.deleteMany({ user: id });

    // Delete user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User and all associated CVs deleted successfully.",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user.",
      error: error.message,
    });
  }
};

// Dashboard Statistics (Admin Dashboard)
const getStats = async (req, res) => {
  try {
    const [totalUsers, totalAdmins, totalCVs, allCvs, recentUsers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      CV.countDocuments(),
      CV.find().select("downloadCount downloads aiUses").lean(),
      User.find({ role: { $ne: "admin" } }) // 🟢 Filter out admin accounts from recent users list
        .select("name email createdAt role status")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    // Sum downloads across all system CVs
    const totalDownloads = allCvs.reduce(
      (sum, cv) => sum + (Number(cv.downloadCount || cv.downloads) || 0),
      0
    );

    // 🟢 FIXED: Direct sum of aiUses without double-counting boolean flags
    const totalAiUses = allCvs.reduce(
      (sum, cv) => sum + (Number(cv.aiUses) || 0),
      0
    );

    const templateStats = await CV.aggregate([
      {
        $group: {
          _id: "$template",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const statsData = {
      totalUsers,
      totalAdmins,
      totalCVs,
      cvsCreated: totalCVs,
      totalDownloads,
      downloads: totalDownloads,
      totalAiUses,
      aiUses: totalAiUses,
      templateStats,
      recentUsers,
    };

    res.status(200).json({
      success: true,
      stats: statsData,
      data: statsData,
      ...statsData,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAllCVs,
  deleteUser,
  getStats,
};