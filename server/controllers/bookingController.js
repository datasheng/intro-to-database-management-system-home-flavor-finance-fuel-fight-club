const database = require('../config/database');

const BookingController = {
  // Method to create a new booking with associated data
  async createBooking(req, res) {
    const {providerId, customerId, availabilityId, serviceId, serviceLocationId, paymentId, startTime, endTime, bookingTime } = req.body;
    try {
      // Validate input data
      if (!providerId || !customerId || !availabilityId || !serviceId || !serviceLocationId || !paymentId || !startTime || !endTime || !bookingTime) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const providerAvailability = await Availability.findByPk(availabilityId);
      if (!providerAvailability || !providerAvailability.isAvailable(startTime, endTime)) {
        return res.status(400).json({ error: 'Provider not available at the specified time' });
      }

      // Create a new booking record with associated data
            const booking = await Booking.create({
        customer_id: customerId,
        provider_id: providerId,
        service_id: serviceId,
        service_location_id: serviceLocationId,
        payment_id: paymentId,
        start_time: startTime,
        end_time: endTime,
        booking_time: bookingTime,
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  async updateBooking(req, res) {
    const { bookingId } = req.params;
    const { providerId, customerId, availabilityId, serviceId, serviceLocationId, paymentId, startTime, endTime, bookingTime } = req.body;
    try {
      // Validate input data
      if (!providerId || !customerId || !availabilityId || !serviceId || !serviceLocationId || !paymentId || !startTime || !endTime || !bookingTime) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Find the booking by ID
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Update booking details
      booking.customer_id = customerId;
      booking.provider_id = providerId;
      booking.service_id = serviceId;
      booking.service_location_id = serviceLocationId;
      booking.payment_id = paymentId;
      booking.start_time = startTime;
      booking.end_time = endTime;
      booking.booking_time = bookingTime;

      await booking.save();

      res.json(booking);
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  },

  async deleteBooking(req, res) {
    const { bookingId } = req.params;
    try {
      // Find the booking by ID
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      await booking.destroy();

      res.status(204).send();
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
