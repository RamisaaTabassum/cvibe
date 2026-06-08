const express = require('express');
const router = express.Router();
const { extractKeywords, fixGrammar } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/keywords', extractKeywords);
router.post('/grammar', fixGrammar);

module.exports = router;