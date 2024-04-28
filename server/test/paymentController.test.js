const request = require('supertest');
const app = require('../app');
const { Payment } = require('../models/paymentModel');

describe('PaymentController', () => {
  // Test case for processing a payment
  it('should process a payment', async () => {
    const paymentData = {
      userAddressId: 1,
      creditCardNumber: 1234567890123456,
      cvc: 123,
      expirationDate: '12/25',
    };

    const response = await request(app).post('/payments').send(paymentData);

    expect(response.status).toBe(201);
    expect(response.body.user_address_id).toBe(paymentData.userAddressId);
    expect(response.body.credit_card_number).toBe(paymentData.creditCardNumber);
    expect(response.body.cvc).toBe(paymentData.cvc);
    expect(response.body.expiration_date).toBe(paymentData.expirationDate);
  });

  // Test case for getting all payments
  it('should get all payments', async () => {
    // Mock the Payment.findAll method to return an array of payments
    jest.spyOn(Payment, 'findAll').mockResolvedValue([
      {
        id: 1,
        user_address_id: 1,
        credit_card_number: 1234567890123456,
        cvc: 123,
        expiration_date: '12/25',
      },
      {
        id: 2,
        user_address_id: 2,
        credit_card_number: 9876543210987654,
        cvc: 456,
        expiration_date: '06/24',
      },
    ]);

    const response = await request(app).get('/payments');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].id).toBe(1);
    expect(response.body[1].id).toBe(2);
  });

  // Test case for creating a payment
  it('should create a payment', async () => {
    const paymentData = {
      userAddressId: 1,
      creditCardNumber: 1234567890123456,
      cvc: 123,
      expirationDate: '12/25',
    };

    const response = await request(app).post('/payments').send(paymentData);

    expect(response.status).toBe(201);
    expect(response.body.user_address_id).toBe(paymentData.userAddressId);
    expect(response.body.credit_card_number).toBe(paymentData.creditCardNumber);
    expect(response.body.cvc).toBe(paymentData.cvc);
    expect(response.body.expiration_date).toBe(paymentData.expirationDate);
  });

  // Test case for updating a payment
  it('should update a payment', async () => {
    const paymentId = 1;
    const updatedPaymentData = {
      userAddressId: 2,
      creditCardNumber: 9876543210987654,
      cvc: 456,
      expirationDate: '06/24',
    };

    // Mock the Payment.findByPk method to return a payment
    jest.spyOn(Payment, 'findByPk').mockResolvedValue({
      id: paymentId,
      user_address_id: 1,
      credit_card_number: 1234567890123456,
      cvc: 123,
      expiration_date: '12/25',
      save: jest.fn(),
    });

    const response = await request(app).put(`/payments/${paymentId}`).send(updatedPaymentData);

    expect(response.status).toBe(200);
    expect(response.body.user_address_id).toBe(updatedPaymentData.userAddressId);
    expect(response.body.credit_card_number).toBe(updatedPaymentData.creditCardNumber);
    expect(response.body.cvc).toBe(updatedPaymentData.cvc);
    expect(response.body.expiration_date).toBe(updatedPaymentData.expirationDate);
  });

  // Test case for deleting a payment
  it('should delete a payment', async () => {
    const paymentId = 1;

    // Mock the Payment.findByPk method to return a payment
    jest.spyOn(Payment, 'findByPk').mockResolvedValue({
      id: paymentId,
      destroy: jest.fn(),
    });

    const response = await request(app).delete(`/payments/${paymentId}`);

    expect(response.status).toBe(204);
  });
});
