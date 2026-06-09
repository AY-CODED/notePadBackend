const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
    try{
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login user
router.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid Password' });

        const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET || 'secretkey');
        res.header('auth-token', token).json({ token });
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;