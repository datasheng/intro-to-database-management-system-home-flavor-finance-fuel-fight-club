const { Payment, Booking, Customer } = require('../models'); // Import Sequelize models

// Define PaymentController methods
const PaymentController = {
  // Method to process a payment for a booking
  async processPayment(req, res) {
    const { bookingId, customerId, amount, paymentMethod /* other payment details */ } = req.body;
    try {
      // Check if the booking exists and is associated with the customer
      const booking = await Booking.findOne({
        where: { id: bookingId, customerId },
      });
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found or not associated with customer' });
      }

      // Create a payment record
      const payment = await Payment.create({
        bookingId,
        customerId,
        amount,
        paymentMethod,
        /* other payment details */
      });

      // Update booking status or perform other actions as needed

      res.status(201).json(payment);
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Failed to process payment' });
    }
  },

  // Method to get all payments
  async getAllPayments(req, res) {
    try {
      const payments = await Payment.findAll({
        include: [Booking, Customer], // Include related models
        // Add other options like where conditions, order, etc., as needed
      });
      res.json(payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  },

  // Other controller methods like updatePayment, deletePayment, etc., can be added here
};

module.exports = PaymentController;