// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const { Parser } = require('json2csv');
const db = require('../config/database'); // Assuming you have this file set up for DB connection

// Create an Express app
const app = express();

// Define route to generate CSV
app.get('/generate-csv', (req, res) => {
    // Call the stored procedure to get report data
    db.query('CALL totalRevenue()', (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Error generating CSV');
            return;
        }

        // Format data into CSV
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(results[0]);

        // Write CSV data to file
        fs.writeFile('report.csv', csv, (err) => {
            if (err) {
                console.error('Error writing CSV file:', err);
                res.status(500).send('Error generating CSV');
                return;
            }
            console.log('CSV file generated successfully');
            res.download('report.csv'); // Send the generated CSV file as a download
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
