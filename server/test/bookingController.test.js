const request = require('supertest');
const app = require('../app');
const { Booking} = require('../models/bookingModel');

describe('BookingController', () => {
  // Test case for creating a new booking
  it('should create a new booking', async () => {
    const bookingData = {
      providerId: 1,
      customerId: 1,
      availabilityId: 1,
      serviceId: 1,
      serviceLocationId: 1,
      paymentId: 1,
      startTime: '2023-06-01T10:00:00Z',
      endTime: '2023-06-01T11:00:00Z',
      bookingTime: '2023-06-01T09:30:00Z',
    };

    const response = await request(app).post('/bookings').send(bookingData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.customer_id).toBe(bookingData.customerId);
    expect(response.body.provider_id).toBe(bookingData.providerId);
    expect(response.body.service_id).toBe(bookingData.serviceId);
    expect(response.body.service_location_id).toBe(bookingData.serviceLocationId);
    expect(response.body.payment_id).toBe(bookingData.paymentId);
    expect(response.body.start_time).toBe(bookingData.startTime);
    expect(response.body.end_time).toBe(bookingData.endTime);
    expect(response.body.booking_time).toBe(bookingData.bookingTime);
  });

  // Test case for updating a booking
  it('should update a booking', async () => {
    const bookingId = 1;
    const updatedBookingData = {
      providerId: 2,
      customerId: 2,
      availabilityId: 2,
      serviceId: 2,
      serviceLocationId: 2,
      paymentId: 2,
      startTime: '2023-06-02T10:00:00Z',
      endTime: '2023-06-02T11:00:00Z',
      bookingTime: '2023-06-02T09:30:00Z',
    };

    // Mock the Booking.findByPk method to return a valid booking
    jest.spyOn(Booking, 'findByPk').mockResolvedValue({
      save: jest.fn(),
    });

    const response = await request(app).put(`/bookings/${bookingId}`).send(updatedBookingData);

    expect(response.status).toBe(200);
    expect(response.body.customer_id).toBe(updatedBookingData.customerId);
    expect(response.body.provider_id).toBe(updatedBookingData.providerId);
    expect(response.body.service_id).toBe(updatedBookingData.serviceId);
    expect(response.body.service_location_id).toBe(updatedBookingData.serviceLocationId);
    expect(response.body.payment_id).toBe(updatedBookingData.paymentId);
    expect(response.body.start_time).toBe(updatedBookingData.startTime);
    expect(response.body.end_time).toBe(updatedBookingData.endTime);
    expect(response.body.booking_time).toBe(updatedBookingData.bookingTime);
  });

  // Test case for deleting a booking
  it('should delete a booking', async () => {
    const bookingId = 1;

    // Mock the Booking.findByPk method to return a valid booking
    jest.spyOn(Booking, 'findByPk').mockResolvedValue({
      destroy: jest.fn(),
    });

    const response = await request(app).delete(`/bookings/${bookingId}`);

    expect(response.status).toBe(204);
  });
});
