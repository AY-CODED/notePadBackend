require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes'); // This was imported but not used
const verifyToken = require('./routes/verifyToken'); // Import your middleware here

// server.js
const db = process.env.MONGODB_URI;
const secret = process.env.TOKEN_SECRET;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notepad-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
// FIX: You must use the notes router with the prefix AND apply the middleware
app.use('/api/notes', verifyToken, noteRoutes); 

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});