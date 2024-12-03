const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

// Sign up controller and routing for registering users
exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

        // Check if All Details are there or not
     if (
        !firstName ||
        !lastName ||
        !email ||
        !password
      )  {
        return res.status(403).send({
            success: false,
            message: "All Fields are required",
        })
     }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Email already exists' });
    }
};

// Login controllers and routing
exports.login = async (req, res) => {
    const { email, password } = req.body;

        // Check if email or password is missing
    if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
             success: false,
            message: `Please Fill up All the Required Fields`,
        })
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        // If user not found with provided email
        if (!user || !user.isVerified) return res.status(400).json({ error: 'Invalid credentials' });

        // Comparing passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        // Generate JWT token and Compare Password
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = router;
