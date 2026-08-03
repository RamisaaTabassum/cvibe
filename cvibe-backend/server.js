require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedAdmin = require("./utils/seedAdmin");

const authRoutes = require("./routes/authRoutes");
const cvRoutes = require("./routes/cvRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://cvibe-frontend.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Postman and server-to-server requests may not contain an Origin header
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize database and seed permanent admin
const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();
  } catch (error) {
    console.error("Initialization error:", error.message);
  }
};

startServer();

app.get("/", (req, res) => {
  res.json({ message: "CVibe API is running ✓" });
});

app.use("/api/auth", authRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});