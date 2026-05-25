const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
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
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    summary: { type: String, default: '' },
  },
  experience: [
    {
      company: { type: String },
      position: { type: String },
      duration: { type: String },
      description: { type: String },
    },
  ],
  education: [
    {
      institution: { type: String },
      degree: { type: String },
      year: { type: String },
    },
  ],
  skills: [{ type: String }],
  template: {
    type: String,
    enum: ['purple', 'dark', 'red'],
    default: 'purple',
  },
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);