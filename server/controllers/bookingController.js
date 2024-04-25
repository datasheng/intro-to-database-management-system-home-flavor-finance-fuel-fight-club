// Import your Sequelize models
const {} = require('../models');

// Define BookingController methods
const BookingController = {
  // Method to create a new booking with associated data
  async createBooking(req, res) {
    const { providerId, customerId, availabilityId, serviceId, serviceLocationId, paymentId, startTime, endTime, bookingTime /* other booking details */ } = req.body;
    try {
      // Validate input data
      if (!providerId || !customerId || !availabilityId || !serviceId || !serviceLocationId || !paymentId || !startTime || !endTime || !bookingTime) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      // Check for scheduling conflicts or other business rules
      // Example: Check if the provider is available during the specified time
      const providerAvailability = await Availability.findByPk(availabilityId);
      if (!providerAvailability || !providerAvailability.isAvailable(startTime, endTime)) {
        return res.status(400).json({ error: 'Provider not available at the specified time' });
      }

      // Create a new booking record with associated data
      const booking = await Booking.create({
        providerId,
        customerId,
        availabilityId,
        serviceId,
        serviceLocationId,
        paymentId,
        startTime,
        endTime,
        bookingTime,
        /* other booking details */
      });

      // Associate related models with the booking
      await booking.setAvailability(providerAvailability);
      await booking.setClasses(await Classes.findByPk(serviceId));
      await booking.setCustomer(await Customer.findByPk(customerId));
      await booking.setPayment(await Payment.findByPk(paymentId));
      await booking.setProvider(await Provider.findByPk(providerId));
      await booking.setService(await Service.findByPk(serviceId));
      await booking.setServiceLocation(await ServiceLocation.findByPk(serviceLocationId));
      // You may associate UserAddress or other related models here if needed

      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  // Method to update a booking
  async updateBooking(req, res) {
    const { bookingId } = req.params;
    const { providerId, customerId, availabilityId, serviceId, serviceLocationId, paymentId, startTime, endTime, bookingTime /* other booking details */ } = req.body;
    try {
      // Validate input data
      if (!providerId || !customerId || !availabilityId || !serviceId || !serviceLocationId || !paymentId || !startTime || !endTime || !bookingTime) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      // Check if the booking exists
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      // Check for scheduling conflicts or other business rules
      // Example: Check if the provider is available during the updated time
      const providerAvailability = await Availability.findByPk(availabilityId);
      if (!providerAvailability || !providerAvailability.isAvailable(startTime, endTime)) {
        return res.status(400).json({ error: 'Provider not available at the updated time' });
      }

      // Update booking details
      booking.providerId = providerId;
      booking.customerId = customerId;
      booking.availabilityId = availabilityId;
      booking.serviceId = serviceId;
      booking.serviceLocationId = serviceLocationId;
      booking.paymentId = paymentId;
      booking.startTime = startTime;
      booking.endTime = endTime;
      booking.bookingTime = bookingTime;
      /* update other booking details as needed */

      // Update associated models if necessary
      await booking.setAvailability(providerAvailability);
      await booking.setClasses(await Classes.findByPk(serviceId));
      await booking.setCustomer(await Customer.findByPk(customerId));
      await booking.setPayment(await Payment.findByPk(paymentId));
      await booking.setProvider(await Provider.findByPk(providerId));
      await booking.setService(await Service.findByPk(serviceId));
      await booking.setServiceLocation(await ServiceLocation.findByPk(serviceLocationId));
      // You may update UserAddress or other related models here if needed

      await booking.save(); // Save the updated booking details to the database

      res.json(booking); // Send the updated booking as JSON response
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  },

  // Method to delete a booking
  async deleteBooking(req, res) {
    const { bookingId } = req.params;
    try {
      // Check if the booking exists
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Perform any additional business logic checks before deletion, if needed

      await booking.destroy(); // Delete the booking record from the database

      res.status(204).send(); // Send a 204 (No Content) response indicating successful deletion
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ error: 'Failed to delete booking' });
    }
  },

  // Other controller methods like getAllBookings, etc., can be added here

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
