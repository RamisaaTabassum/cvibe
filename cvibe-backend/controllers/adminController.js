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

// Dashboard Statistics
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalCVs = await CV.countDocuments();

    const templateStats = await CV.aggregate([
      {
        $group: {
          _id: "$template",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
        totalCVs,
        templateStats,
      },
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