const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Routes that do not require authentication
router.post('/register', providerController.registerProvider);
router.post('/login', providerController.loginProvider);

// Apply authMiddleware to all subsequent routes
router.use(authMiddleware);

// Routes that require authentication, and the specific role of 'customer'
router.get('/classes/:serviceType', roleMiddleware(['provider']), providerController.selectClassType);
router.post('/address', roleMiddleware(['provider']), providerController.enterAddressDetails);
router.post('/create', roleMiddleware(['provider']), providerController.createClass);
router.get('/list', roleMiddleware(['provider']), providerController.listClasses);
router.put('/update', roleMiddleware(['provider']), providerController.updateClass);
router.delete('/remove', roleMiddleware(['provider']), providerController.removeClass);

module.exports = router;
