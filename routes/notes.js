const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes for a specific user
router.get('/', async(req, res) => {
    try{
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new note
router.post('/', async(req, res) => {
    try{
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content,
            user: req.user._id
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;