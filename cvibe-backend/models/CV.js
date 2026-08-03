const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: 'My CV',
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      name: { type: String, default: '' },
      title: { type: String, default: '' },
      jobTitle: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      summary: { type: String, default: '' },
    },
    experience: [
      {
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        jobTitle: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        duration: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    education: [
      {
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        startYear: { type: String, default: '' },
        endYear: { type: String, default: '' },
        year: { type: String, default: '' },
        cgpa: { type: String, default: '' },
      },
    ],
    skills: [{ type: String }],

    aiUsed: { type: Boolean, default: false },
    aiUses: { type: Number, default: 0 },
    atsScore: { type: Number, default: 0 },
    score: { type: Number, default: 0 },

    certifications: { type: String, default: '' },
    technicalSkills: { type: String, default: '' },
    softSkills: { type: String, default: '' },
    languages: { type: String, default: '' },

    template: {
      type: String,
      enum: ['purple', 'dark', 'red'],
      default: 'purple',
    },

    // 🟢 Single standardized download tracking field
    downloadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.models.CV || mongoose.model('CV', cvSchema);