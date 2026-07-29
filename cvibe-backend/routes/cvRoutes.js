const express = require('express');
const router = express.Router();
const { 
  createCV, 
  getMyCVs, 
  getCVById, 
  updateCV, 
  deleteCV, 
  incrementDownload,
  incrementAiUse 
} = require('../controllers/cvController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes below
router.use(protect);

// Standard CV CRUD routes
router.post('/', createCV);
router.get('/', getMyCVs);
router.get('/:id', getCVById);
router.put('/:id', updateCV);
router.delete('/:id', deleteCV);

// Analytics tracking routes
router.post('/:id/download', incrementDownload);
router.patch('/:id/track-download', incrementDownload);

router.post('/:id/ai-use', incrementAiUse);
router.patch('/:id/track-ai-use', incrementAiUse);

module.exports = router;