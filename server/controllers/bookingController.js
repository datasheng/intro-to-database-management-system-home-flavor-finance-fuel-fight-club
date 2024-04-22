// Import your Sequelize models
const {availability,booking,classes,customer,payment,provider,service,service_location,user_address} = require('../models');

// Define your controller methods
////////////////////////////////////////////////////////////////////////
const BookingController = {
  // Method to get all bookings
  async getAllBookings(req, res) {
    try {
      // Fetch all bookings with related Provider, Customer, and Availability data
      const bookings = await Booking.findAll({
        include: [Provider, Customer, Availability], // Include related models
        // Add other options like where conditions, order, etc., as needed
      });
      // Send the bookings as JSON response
      res.json(bookings);
    } catch (error) {
      // Handle errors when fetching bookings
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  },
////////////////////////////////////////////////////////////////////////

  
  // Method to create a new booking
  async createBooking(req, res) {
    // Extract booking details from the request body
    const { providerId, customerId, availabilityId, /* other booking details */ } = req.body;
    try {
      // Create a new booking record in the database
      const booking = await Booking.create({
        providerId,
        customerId,
        availabilityId,
        /* other booking details */
      });
      // Send the newly created booking as JSON response with status 201 (Created)
      res.status(201).json(booking);
    } catch (error) {
      // Handle errors when creating a booking
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },
  /////////////////////////////////////////////////////////////////////////////

  // Other controller methods like updateBooking, deleteBooking,

  async updateBooking(req, res) {
    const { bookingId } = req.params; // Extract the booking ID from the request parameters
    const { providerId, customerId, availabilityId, /* other booking details */ } = req.body; // Extract updated booking details from the request body
    try {
      const booking = await Booking.findByPk(bookingId); // Find the booking by its ID
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' }); // Return an error if the booking is not found
      }

      // Update booking details
      booking.providerId = providerId;
      booking.customerId = customerId;
      booking.availabilityId = availabilityId;
      /* update other booking details as needed */

      await booking.save(); // Save the updated booking details to the database

      res.json(booking); // Send the updated booking as JSON response
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  },
/////////////////////////////////////////////////////////////////////////////
  // Method to delete a booking
  async deleteBooking(req, res) {
    const { bookingId } = req.params; // Extract the booking ID from the request parameters
    try {
      const booking = await Booking.findByPk(bookingId); // Find the booking by its ID
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' }); // Return an error if the booking is not found
      }

      await booking.destroy(); // Delete the booking record from the database

      res.status(204).send(); // Send a 204 (No Content) response indicating successful deletion
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ error: 'Failed to delete booking' });
    }
  },

  
};

module.exports = BookingController;

/*

const db = require('./database'); 

//CreateBooking functionality which is used whenever a user books a class 
async function createBooking(bookingData) {
  const {customer_id, provider_id, service_id, service_location_id, payment_id, start_time, end_time, booking_time } = bookingData;
  const result = await db.query(
    'INSERT INTO Booking (customer_id, provider_id, service_id, service_location_id, payment_id, start_time, end_time, booking_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [customer_id, provider_id, service_id, service_location_id, payment_id, start_time, end_time, booking_time]
  );

  return result.insertId;
}

async function getBookingById(bookingId) {
  const result = await db.query('SELECT * FROM Booking WHERE id = ?', [bookingId]);
  return result[0];
}

async function updateBookingTime(bookingId, newStartTime, newEndTime) {

  await db.query(
    'UPDATE Booking SET start_time = ?, end_time = ? WHERE id = ?',
    [newStartTime, newEndTime, bookingId]
  );
}

// Delete a booking record from the database
async function cancelBooking(bookingId) {
    await db.query(
      'DELETE FROM Booking WHERE id = ?',
      [bookingId]
    );
  }

module.exports = {
  createBooking,
  getBookingById,
  updateBookingTime,
  cancelBooking
};

*/