const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Import mysql2
require('dotenv').config();
const jobRoutes = require('./routes/job');




const app = express();

app.use(express.json());
app.use(cors());
// Use job routes for API
app.use('/api/jobs', jobRoutes);

// Create MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected');
});

// Basic route
app.get('/', (req, res) => {
    res.send('Job Search API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
