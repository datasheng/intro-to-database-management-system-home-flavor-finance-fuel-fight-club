const express = require('express');
const router = express.Router();
const { parseAsync } = require('json2csv');
const db = require('../config/database');

router.get('/download-csv', async (req, res) => {
    try {
        const [results, fields] = await db.query('CALL totalRevenue();');

        // Check if results are empty
        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ message: "No data found to generate CSV" });
        }

        // Safely extract field names from the first element of fields if it's not null
        if (!fields || !Array.isArray(fields[0])) {
            throw new Error("Fields metadata is undefined or not structured correctly");
        }

        const csvFields = fields[0].map(f => {
            if (!f || !f.name) {
                throw new Error("Field object is missing or does not have a 'name' property");
            }
            return f.name;
        });

        const csv = await parseAsync(results[0], { fields: csvFields });

        res.header('Content-Type', 'text/csv');
        res.attachment('report.csv');
        res.send(csv);
    } catch (error) {
        console.error("Detailed Error:", error);
        res.status(500).json({ message: "Error generating CSV file", error: error.message });
    }
});

module.exports = router;



