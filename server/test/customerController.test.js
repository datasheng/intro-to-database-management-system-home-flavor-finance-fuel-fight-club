const request = require('supertest');
const app = require('../app');
const { Customer } = require('../models/customerModel');

describe('customerController', () => {
  
  // Test case for getting customer details by ID
  it('should get customer details by ID', async () => {
    const customerId = 1;

    // Mock the Customer.findByPk method to return a valid customer
    jest.spyOn(Customer, 'findByPk').mockResolvedValue({
      id: customerId,
      user_address_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phone_number: '1234567890',
    });

    const response = await request(app).get(`/customers/${customerId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(customerId);
    expect(response.body.first_name).toBe('John');
    expect(response.body.last_name).toBe('Doe');
    expect(response.body.email).toBe('john@example.com');
    expect(response.body.password).toBe('password123');
    expect(response.body.phone_number).toBe('1234567890');
  });

  // Test case for creating a new customer
  it('should create a new customer', async () => {
    const customerData = {
      userAddressId: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'password456',
      phoneNumber: '9876543210',
    };

    const response = await request(app).post('/customers').send(customerData);

    expect(response.status).toBe(201);
    expect(response.body.user_address_id).toBe(customerData.userAddressId);
    expect(response.body.first_name).toBe(customerData.firstName);
    expect(response.body.last_name).toBe(customerData.lastName);
    expect(response.body.email).toBe(customerData.email);
    expect(response.body.password).toBe(customerData.password);
    expect(response.body.phone_number).toBe(customerData.phoneNumber);
  });

  // Test case for updating customer details
  it('should update customer details', async () => {
    const customerId = 1;
    const updatedCustomerData = {
      userAddressId: 2,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'newpassword123',
      phoneNumber: '1234567890',
    };

    // Mock the Customer.findByPk method to return a valid customer
    jest.spyOn(Customer, 'findByPk').mockResolvedValue({
      id: customerId,
      user_address_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phone_number: '1234567890',
      save: jest.fn(),
    });

    const response = await request(app).put(`/customers/${customerId}`).send(updatedCustomerData);

    expect(response.status).toBe(200);
    expect(response.body.user_address_id).toBe(updatedCustomerData.userAddressId);
    expect(response.body.first_name).toBe(updatedCustomerData.firstName);
    expect(response.body.last_name).toBe(updatedCustomerData.lastName);
    expect(response.body.email).toBe(updatedCustomerData.email);
    expect(response.body.password).toBe(updatedCustomerData.password);
    expect(response.body.phone_number).toBe(updatedCustomerData.phoneNumber);
  });

  // Test case for deleting a customer
  it('should delete a customer', async () => {
    const customerId = 1;

    // Mock the Customer.findByPk method to return a valid customer
    jest.spyOn(Customer, 'findByPk').mockResolvedValue({
      id: customerId,
      destroy: jest.fn(),
    });

    const response = await request(app).delete(`/customers/${customerId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Customer deleted successfully');
  });
});

