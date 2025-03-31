const express = require('express');
const cors = require('cors');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/search', async (req, res) => {
    const { description, location } = req.query;
    const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${description}&location=${location}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        });

        const jobs = await response.json();
        if (jobs.data.length > 0) {
            res.json(jobs.data);
        } else {
            res.json({ message: "Job not found" });
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
