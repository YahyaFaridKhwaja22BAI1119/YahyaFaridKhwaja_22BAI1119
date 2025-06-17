const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // 🔥 This line is critical!

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    console.log("✅ MongoDB connected successfully");
  })
  .catch(err => console.error("MongoDB connection error:", err));