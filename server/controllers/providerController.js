const database = require('../config/database');

const ProviderController = {
  // Method to get all providers
  async getAllProviders(req, res) {
    try {
      // Fetch all providers
      const providers = await Provider.findAll();
      // Send the providers as JSON response
      res.json(providers);
    } catch (error) {
      // Handle errors when fetching providers
      console.error('Error fetching providers:', error);
      res.status(500).json({ error: 'Failed to fetch providers' });
    }
  },

  // Method to create a new provider
  async createProvider(req, res) {
    // Extract provider details from the request body
    const { firstName, lastName, email, password, phoneNumber, payPerBooking} = req.body;
    try {
      // Create a new provider record in the database
      const provider = await Provider.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone_number: phoneNumber,
        pay_per_booking: payPerBooking,
      });
      // Send the newly created provider as JSON response with status 201 (Created)
      res.status(201).json(provider);
    } catch (error) {
      // Handle errors when creating a provider
      console.error('Error creating provider:', error);
      res.status(500).json({ error: 'Failed to create provider' });
    }
  },

  // Method to update a provider
  async updateProvider(req, res) {
    // Extract provider ID from request parameters and provider details from request body
    const {providerId} = req.params;
    const { firstName, lastName, email, password, phoneNumber, payPerBooking /* other provider details */ } = req.body;
    try {
      // Find the provider by ID
      const provider = await Provider.findByPk(providerId);
      if (!provider) {
        // If provider not found, return an error response
        return res.status(404).json({ error: 'Provider not found' });
      }

      // Update provider details
      provider.first_name = firstName;
      provider.last_name = lastName;
      provider.email = email;
      provider.password = password;
      provider.phone_number = phoneNumber;
      provider.pay_per_booking = payPerBooking;
      /* update other provider details as needed */

      // Save the updated provider to the database
      await provider.save();

      // Send the updated provider as JSON response
      res.json(provider);
    } catch (error) {
      // Handle errors when updating provider
      console.error('Error updating provider:', error);
      res.status(500).json({ error: 'Failed to update provider' });
    }
  },

  // Method to delete a provider
  async deleteProvider(req, res) {
    // Extract provider ID from request parameters
    const { providerId } = req.params;
    try {
      // Find the provider by ID
      const provider = await Provider.findByPk(providerId);
      if (!provider) {
        // If provider not found, return an error response
        return res.status(404).json({ error: 'Provider not found' });
      }

      // Delete the provider from the database
      await provider.destroy();

      // Send success message
      res.status(204).send();
    } catch (error) {
      // Handle errors when deleting provider
      console.error('Error deleting provider:', error);
      res.status(500).json({ error: 'Failed to delete provider' });
    }
  },
};

// Export the ProviderController object
module.exports = ProviderController;
