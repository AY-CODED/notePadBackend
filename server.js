const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Optionally, listen for specific connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected!');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`);
});