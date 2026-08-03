const CV = require('../models/Cv');

const createCV = async (req, res) => {
  try {
    const cv = await CV.create({
      user: req.user.id,
      ...req.body,
    });
    res.status(201).json({ success: true, cv });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyCVs = async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, cvs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCVById = async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    if (cv.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ success: true, cv });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCV = async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    if (cv.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updated = await CV.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, cv: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCV = async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    if (cv.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await CV.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'CV deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increments download tracking field in MongoDB
const incrementDownload = async (req, res) => {
  try {
    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json({
      success: true,
      message: 'Download count updated',
      downloadCount: cv.downloadCount || 0,
      cv,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increments AI usage stats and sets aiUsed flag in MongoDB
const incrementAiUse = async (req, res) => {
  try {
    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { aiUses: 1 },
        $set: { aiUsed: true },
      },
      { new: true }
    );

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json({
      success: true,
      message: 'AI usage count updated',
      aiUses: cv.aiUses || 0,
      aiUsed: true,
      cv,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCV,
  getMyCVs,
  getCVById,
  updateCV,
  deleteCV,
  incrementDownload,
  trackDownload: incrementDownload,
  incrementAiUse,
  trackAiUse: incrementAiUse,
};