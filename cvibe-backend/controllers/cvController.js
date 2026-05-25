const CV = require('../models/CV');


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

module.exports = { createCV, getMyCVs, getCVById, updateCV, deleteCV };