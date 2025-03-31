const express = require('express');
const cors = require('cors');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/search', async (req, res) => {
    const { description, location } = req.query;

    // URL encode the description and location to handle special characters
    const encodedDescription = encodeURIComponent(description);
    const encodedLocation = encodeURIComponent(location);

    const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${encodedDescription}&location=${encodedLocation}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        });

        // Log the response status and headers to see if something's wrong
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);

        // Check if the response is successful (status 200)
        if (response.status !== 200) {
            throw new Error('API request failed with status ' + response.status);
        }

        const jobs = await response.json();

        // Log the jobs data for debugging
        console.log("Fetched jobs:", jobs);
        console.log("API Key:", process.env.e022991a17msha1106f520d90c42p1bd3b4jsn0c674e7d644f);
        // Check if jobs.data exists and is an array
        if (Array.isArray(jobs.data) && jobs.data.length > 0) {
            res.json(jobs.data);
        } else {
            res.json({ message: "Job not found" });
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


module.exports = router;
