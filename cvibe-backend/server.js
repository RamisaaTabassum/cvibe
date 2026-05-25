require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cvRoutes = require('./routes/cvRoutes');

const app = express();

connectDB();

// CORS (safe + frontend connected)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'CVibe API is running ✓' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});