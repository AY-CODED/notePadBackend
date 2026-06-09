require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const verifyToken = require('./routes/verifyToken');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Enable CORS for all routes BEFORE route definitions
app.use(cors({
    origin: 'https://note-pad-frontend-seven.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Middleware to parse JSON
app.use(express.json());

// 3. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notepad-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// 4. Routes
app.use('/auth', authRoutes);
app.use('/notes', verifyToken, noteRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});