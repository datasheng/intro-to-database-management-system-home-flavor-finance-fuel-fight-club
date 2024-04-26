// Import Sequelize models
const { Service } = require('../models/serviceModel');

// Define ServiceController methods
const ServiceController = {
  // Method to get all services
  async getAllServices(req, res) {
    try {
      // Fetch all services with related Provider data
      const services = await Service.findAll({
        // Add other options like where conditions, order, etc., as needed
      });
      // Send the services as JSON response
      res.json(services);
    } catch (error) {
      // Handle errors when fetching services
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  },

  // Method to create a new service
  async createService(req, res) {
    // Extract service details from the request body
    const {serviceName, serviceCost } = req.body;
    try {
      // Create a new service record in the database
      const service = await Service.create({
        service_name: serviceName,
        service_cost: serviceCost,
      });

      // Send the newly created service as JSON response with status 201 (Created)
      res.status(201).json(service);
    } catch (error) {
      // Handle errors when creating a service
      console.error('Error creating service:', error);
      res.status(500).json({ error: 'Failed to create service' });
    }
  },

  // Method to update a service
  async updateService(req, res) {
    // Extract service ID from request parameters and service details from request body
    const { serviceId } = req.params;
    const {serviceName, serviceCost /* other service details */ } = req.body;
    try {
      // Find the service by ID
      const service = await Service.findByPk(serviceId);
      if (!service) {
        // If service not found, return an error response
        return res.status(404).json({ error: 'Service not found' });
      }

      // Update service details
      service.service_name = serviceName;
      service.service_cost = serviceCost;

      // Save the updated service to the database
      await service.save();

      // Send the updated service as JSON response
      res.json(service);
    } catch (error) {
      // Handle errors when updating service
      console.error('Error updating service:', error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  },

  // Method to delete a service
  async deleteService(req, res) {
    // Extract service ID from request parameters
    const { serviceId } = req.params;
    try {
      // Find the service by ID
      const service = await Service.findByPk(serviceId);
      if (!service) {
        // If service not found, return an error response
        return res.status(404).json({ error: 'Service not found' });
      }

      // Delete the service from the database
      await service.destroy();

      // Send success message
      res.status(204).send();
    } catch (error) {
      // Handle errors when deleting service
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  },
};

// Export the ServiceController object
module.exports = ServiceController;
