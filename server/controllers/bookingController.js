const { Booking, Provider, Customer, Availability } = require('../models'); // Import your Sequelize models

// Define your controller methods
const BookingController = {
  // Method to get all bookings
  async getAllBookings(req, res) {
    try {
      const bookings = await Booking.findAll({
        include: [Provider, Customer, Availability], // Include related models
        // Add other options like where conditions, order, etc., as needed
      });
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  },

  // Method to create a new booking
  async createBooking(req, res) {
    const { providerId, customerId, availabilityId, /* other booking details */ } = req.body;
    try {
      const booking = await Booking.create({
        providerId,
        customerId,
        availabilityId,
        /* other booking details */
      });
      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  // Other controller methods like updateBooking, deleteBooking, etc., can be added here
};

module.exports = BookingController;