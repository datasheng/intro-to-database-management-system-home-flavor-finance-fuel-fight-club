const request = require('supertest');
const app = require('../app');
const { Provider } = require('../models/providerModel');

describe('ProviderController', () => {
  // Test case for getting all providers
  it('should get all providers', async () => {
    // Mock the Provider.findAll method to return an array of providers
    jest.spyOn(Provider, 'findAll').mockResolvedValue([
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone_number: '1234567890',
        pay_per_booking: 100,
      },
      {
        id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        password: 'password456',
        phone_number: '9876543210',
        pay_per_booking: 150,
      },
    ]);

    const response = await request(app).get('/providers');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].id).toBe(1);
    expect(response.body[1].id).toBe(2);
  });

  // Test case for creating a new provider
  it('should create a new provider', async () => {
    const providerData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phoneNumber: '1234567890',
      payPerBooking: 100,
    };

    const response = await request(app).post('/providers').send(providerData);

    expect(response.status).toBe(201);
    expect(response.body.first_name).toBe(providerData.firstName);
    expect(response.body.last_name).toBe(providerData.lastName);
    expect(response.body.email).toBe(providerData.email);
    expect(response.body.password).toBe(providerData.password);
    expect(response.body.phone_number).toBe(providerData.phoneNumber);
    expect(response.body.pay_per_booking).toBe(providerData.payPerBooking);
  });

  // Test case for updating a provider
  it('should update a provider', async () => {
    const providerId = 1;
    const updatedProviderData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'newpassword123',
      phoneNumber: '1234567890',
      payPerBooking: 200,
    };

    // Mock the Provider.findByPk method to return a provider
    jest.spyOn(Provider, 'findByPk').mockResolvedValue({
      id: providerId,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phone_number: '1234567890',
      pay_per_booking: 100,
      save: jest.fn(),
    });

    const response = await request(app).put(`/providers/${providerId}`).send(updatedProviderData);

    expect(response.status).toBe(200);
    expect(response.body.first_name).toBe(updatedProviderData.firstName);
    expect(response.body.last_name).toBe(updatedProviderData.lastName);
    expect(response.body.email).toBe(updatedProviderData.email);
    expect(response.body.password).toBe(updatedProviderData.password);
    expect(response.body.phone_number).toBe(updatedProviderData.phoneNumber);
    expect(response.body.pay_per_booking).toBe(updatedProviderData.payPerBooking);
  });

  // Test case for deleting a provider
  it('should delete a provider', async () => {
    const providerId = 1;

    // Mock the Provider.findByPk method to return a provider
    jest.spyOn(Provider, 'findByPk').mockResolvedValue({
      id: providerId,
      destroy: jest.fn(),
    });

    const response = await request(app).delete(`/providers/${providerId}`);

    expect(response.status).toBe(204);
  });
});
