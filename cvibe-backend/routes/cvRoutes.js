const express = require('express');
const router = express.Router();
const {
  createCV,
  getMyCVs,
  getCVById,
  updateCV,
  deleteCV,
} = require('../controllers/cvController');
const { protect } = require('../middleware/authMiddleware');


router.use(protect);

router.post('/', createCV);
router.get('/', getMyCVs);
router.get('/:id', getCVById);
router.put('/:id', updateCV);
router.delete('/:id', deleteCV);

module.exports = router;