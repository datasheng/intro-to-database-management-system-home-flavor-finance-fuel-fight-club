const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');
const { notFound, errorHandler } = require('../middlewares/errorMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Route to register a new customer (Public access)
router.post('/register', customerController.registerCustomer, errorHandler);

// Route to login (Public access)
router.post('/login', customerController.loginCustomer, errorHandler);

// Route to fetch class options (Requires authentication and role chekcing)
router.get('/classes', authMiddleware, customerController.getClassOptions, errorHandler);

// Route to get session times for a specific class (Requires authentication and role checking)
router.get('/sessions', authMiddleware, customerController.getSessionOptions, errorHandler);

// Route to process payment and booking (Requires authentication and role checking)
router.post('/payment', authMiddleware, roleMiddleware(['customer']), customerController.processPayment, errorHandler);

// Handle 404 Not Found
router.use(notFound);

// General error handler
router.use(errorHandler);

module.exports = router;
