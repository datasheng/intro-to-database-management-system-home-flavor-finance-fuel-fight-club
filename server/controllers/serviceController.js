// Import Sequelize models
const { Service, Provider } = require('../models');

// Define ServiceController methods
const ServiceController = {
  // Method to get all services
  async getAllServices(req, res) {
    try {
      // Fetch all services with related Provider data
      const services = await Service.findAll({
        include: [Provider], // Include related Provider model
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
    const { providerId, serviceName, serviceCost /* other service details */ } = req.body;
    try {
      // Check if the provider exists
      const provider = await Provider.findByPk(providerId);
      if (!provider) {
        // If the provider is not found, return an error response
        return res.status(404).json({ error: 'Provider not found' });
      }

      // Create a new service record in the database
      const service = await Service.create({
        providerId,
        serviceName,
        serviceCost,
        /* other service details */
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
    const { providerId, serviceName, serviceCost /* other service details */ } = req.body;
    try {
      // Find the service by ID
      const service = await Service.findByPk(serviceId);
      if (!service) {
        // If service not found, return an error response
        return res.status(404).json({ error: 'Service not found' });
      }

      // Update service details
      service.providerId = providerId;
      service.serviceName = serviceName;
      service.serviceCost = serviceCost;
      /* update other service details as needed */

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


/*

const db = require('./database'); // database is the separate database module that handles db connection and 

//Login Functionality 
async function createUser(userData) {

  const { address_one, address_two, city, state, zipcode } = userData;
  
  // Insert user data into the database
  const result = await db.query(
    'INSERT INTO User_Address (address_one, address_two, city, state, zipcode) VALUES (?, ?, ?, ?)',
    [address_one, address_two, city, state, zipcode ]
  );

  return result.insertId;
}

async function getUserById(userId) {
  const result = await db.query('SELECT * FROM User_Address WHERE id = ?', [userId]);
  return result[0];
}

//Changing up the 
async function updateUser(userId, userData) {
  // Perform validation and sanitization of userData
  const { address_one, address_two, city, state, zipcode } = userData;
  
  // Update user data in the database
  await db.query(
    'UPDATE User_Address SET address_one = ?, address_two = ?, city = ?, state = ?, zipcode = ? WHERE id = ?',
    [address_one, address_two, city, state, zipcode, userId]
  );
}

async function deleteUser(userID) {
  await db.query(
    'DELETE FROM User_Address WHERE id = ?',
    [userId]
  );
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser
};

*/
