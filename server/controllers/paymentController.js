// Import Sequelize models
const {Payment} = require('../models/paymentModel');

// Define PaymentController methods
const PaymentController = {
  // Method to process a payment for a booking
  async processPayment(req, res) {
    // Extract payment details from the request body
    const { userAddressId, creditCardNumber, cvc, expirationDate } = req.body;
    try {
        //Create Payment record 
        const payment = await Payment.create({
        user_address_id: userAddressId,
        credit_card_number: creditCardNumber,
        cvc,
        expiration_date: expirationDate,
      });
      // Send the newly created payment as JSON response with status 201 (Created)
      res.status(201).json(payment);
    } catch (error) {
      // Handle errors when processing payment
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Failed to process payment' });
    }
  },

  // Method to get all payments
  async getAllPayments(req, res) {
    try {
      // Fetch all payments with related Booking and Customer data
      const payments = await Payment.findAll({
        // Add other options like where conditions, order, etc., as needed
      });
      // Send the payments as JSON response
      res.json(payments);
    } catch (error) {
      // Handle errors when fetching payments
      console.error('Error fetching payments:', error);
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  },

  // Method to create a new payment
  async createPayment(req, res) {
    // Extract payment details from the request body
    const {userAddressId, creditCardNumber, cvc, expirationDate} = req.body;
    try {
      // Create a payment record in the database
      const payment = await Payment.create({
        user_address_id: userAddressId,
        credit_card_number: creditCardNumber,
        cvc,
        expiration_date: expirationDate,
      });

      // Send the newly created payment as JSON response with status 201 (Created)
      res.status(201).json(payment);
    } catch (error) {
      // Handle errors when creating payment
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  },

  // Method to update a payment
  async updatePayment(req, res) {
    // Extract payment ID from request parameters and payment details from request body
    
    const { paymentId } = req.params;
    const { userAddressId, creditCardNumber, cvc, expirationDate } = req.body;
    try {
      // Find the payment by ID
      const payment = await Payment.findByPk(paymentId);
      if (!payment) {
        // If payment not found, return an error response
        return res.status(404).json({ error: 'Payment not found' });
      }

      // Update payment details
      payment.user_address_id = userAddressId;
      payment.credit_card_number = creditCardNumber;
      payment.cvc = cvc;
      payment.expiration_date = expirationDate;
    
      // Save the updated payment to the database
      await payment.save();

      // Send the updated payment as JSON response
      res.json(payment);
    } catch (error) {
      // Handle errors when updating payment
      console.error('Error updating payment:', error);
      res.status(500).json({ error: 'Failed to update payment' });
    }
  },

  // Method to delete a payment
  async deletePayment(req, res) {
    // Extract payment ID from request parameters
    const { paymentId } = req.params;
    try {
      // Find the payment by ID
      const payment = await Payment.findByPk(paymentId);
      if (!payment) {
        // If payment not found, return an error response
        return res.status(404).json({ error: 'Payment not found' });
      }

      // Delete the payment from the database
      await payment.destroy();

      // Send success message
      res.status(204).send();
    } catch (error) {
      // Handle errors when deleting payment
      console.error('Error deleting payment:', error);
      res.status(500).json({ error: 'Failed to delete payment' });
    }
  },
};

// Export the PaymentController object
module.exports = PaymentController;
