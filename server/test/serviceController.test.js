const request = require('supertest');
const app = require('../app');
const Service = require('../models/serviceModel'); // Import the Service model

describe('ServiceController', () => {
  // Test case for getAllServices
  it('should get all services', async () => {
    // Make a request to fetch all services
    const response = await request(app).get('/services');
    // Assert that the status code is 200
    expect(response.status).toBe(200);
    // Assert that the response body is an array
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test case for createService
  it('should create a new service', async () => {
    // Define service data
    const serviceData = {
      serviceName: 'Test Service',
      serviceCost: 100,
    };
    // Make a request to create a new service
    const response = await request(app).post('/services').send(serviceData);
    // Assert that the status code is 201
    expect(response.status).toBe(201);
    // Assert that the response body matches the created service data
    expect(response.body.service_name).toBe(serviceData.serviceName);
    expect(response.body.service_cost).toBe(serviceData.serviceCost);
    // Clean up: delete the created service from the database
    await Service.destroy({ where: { service_name: serviceData.serviceName } });
  });

  // Test case for updateService
  it('should update an existing service', async () => {
    // Create a service in the database for updating
    const createdService = await Service.create({
      service_name: 'Test Service',
      service_cost: 100,
    });
    // Define updated service data
    const updatedServiceData = {
      serviceName: 'Updated Test Service',
      serviceCost: 200,
    };
    // Make a request to update the service
    const response = await request(app)
      .put(`/services/${createdService.id}`)
      .send(updatedServiceData);
    // Assert that the status code is 200
    expect(response.status).toBe(200);
    // Assert that the response body matches the updated service data
    expect(response.body.service_name).toBe(updatedServiceData.serviceName);
    expect(response.body.service_cost).toBe(updatedServiceData.serviceCost);
    // Clean up: delete the updated service from the database
    await Service.destroy({ where: { id: createdService.id } });
  });

  // Test case for deleteService
  it('should delete an existing service', async () => {
    // Create a service in the database for deletion
    const createdService = await Service.create({
      service_name: 'Service to Delete',
      service_cost: 150,
    });
    // Make a request to delete the service
    const response = await request(app).delete(`/services/${createdService.id}`);
    // Assert that the status code is 204
    expect(response.status).toBe(204);
    // Clean up: ensure that the service has been deleted from the database
    const service = await Service.findByPk(createdService.id);
    expect(service).toBeNull(); // Assert that the service is null, indicating it's been deleted
  });
});
