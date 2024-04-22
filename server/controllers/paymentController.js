// Import Sequelize models
const { Payment, Booking, Customer } = require('../models');

// Define PaymentController methods
const PaymentController = {
  // Method to process a payment for a booking
  async processPayment(req, res) {
    // Extract payment details from the request body
    const { bookingId, customerId, amount, paymentMethod /* other payment details */ } = req.body;
    try {
      // Check if the booking exists and is associated with the customer
      const booking = await Booking.findOne({
        where: { id: bookingId, customerId },
      });
      if (!booking) {
        // If the booking is not found or not associated with the customer, return an error response
        return res.status(404).json({ error: 'Booking not found or not associated with customer' });
      }

      // Create a payment record in the database
      const payment = await Payment.create({
        bookingId,
        customerId,
        amount,
        paymentMethod,
        /* other payment details */
      });

      // Update booking status or perform other actions as needed

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
        include: [Booking, Customer], // Include related models
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

  // Other controller methods like updatePayment, deletePayment, etc., can be added here
}