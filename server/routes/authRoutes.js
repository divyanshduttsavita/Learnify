const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user (Storing password in plain text for simplicity as requested, though bcrypt is recommended for production)
        const user = new User({
            name,
            email,
            password,
            xp: 0,
            streak: 0,
            lessonsCompleted: 0,
            quizzesPassed: 0,
            enrolled: [],
            progress: {}
        });

        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                xp: user.xp,
                streak: user.streak,
                lessonsCompleted: user.lessonsCompleted,
                quizzesPassed: user.quizzesPassed,
                enrolled: user.enrolled,
                progress: user.progress
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                xp: user.xp,
                streak: user.streak,
                lessonsCompleted: user.lessonsCompleted,
                quizzesPassed: user.quizzesPassed,
                enrolled: user.enrolled,
                progress: user.progress
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Update user state (XP, progress, etc.)
router.post('/update', async (req, res) => {
    try {
        const { email, xp, streak, lessonsCompleted, quizzesPassed, enrolled, progress } = req.body;
        
        const user = await User.findOneAndUpdate(
            { email },
            { xp, streak, lessonsCompleted, quizzesPassed, enrolled, progress },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Server error during update' });
    }
});

module.exports = router;
