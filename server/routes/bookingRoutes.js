const express = require('express');
const router = express.Router();

// Add booking-specific routes here
router.get('/available-classes', (req, res) => {
    res.json({ message: 'List of available classes' });
});

module.exports = router;