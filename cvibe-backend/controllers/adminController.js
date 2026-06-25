const User = require('../models/User');
const CV = require('../models/CV');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all CVs
const getAllCVs = async (req, res) => {
  try {
    const cvs = await CV.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: cvs.length,
      cvs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin cannot be deleted' });
    }


    await CV.deleteMany({ user: req.params.id });

    // User delete
    await User.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'User and their CVs deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin stats
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalCVs = await CV.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    const templateStats = await CV.aggregate([
      { $group: { _id: '$template', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalCVs,
        totalAdmins,
        templateStats,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, getAllCVs, deleteUser, getStats };