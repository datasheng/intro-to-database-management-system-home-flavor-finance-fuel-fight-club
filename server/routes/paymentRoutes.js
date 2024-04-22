const express = require('express');
const router = express.Router();

// Handle payment processing
router.post('/process-payment', (req, res) => {
    res.json({ message: 'Payment processed' });
});

module.exports = router;