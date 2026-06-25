const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllCVs,
  deleteUser,
  getStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// Admin routes with authentication and authorization
router.use(protect);
router.use(adminOnly);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/cvs', getAllCVs);
router.delete('/users/:id', deleteUser);

module.exports = router;