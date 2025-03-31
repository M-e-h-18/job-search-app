// backend/routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Create a new user
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, username });
    });
});

// User login (authentication)
router.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', userId: user.id });
    });
});

module.exports = router;
