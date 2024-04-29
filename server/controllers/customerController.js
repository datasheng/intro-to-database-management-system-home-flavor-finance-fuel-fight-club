const database = require('../config/database');

const customerController = {
  
  // Method to get user details by ID
  async getCustomerById(req, res) {
    // Extract the user ID from the request parameters
    const customerId = req.params.id;
    try {
      // Fetch the user details by ID, including related Customer and Provider data
      const customer = await Customer.findByPk(customerId);
      
      if (!customer) {
        // If the user is not found, return an error response
        return res.status(404).json({ error: 'Customer not found' });
      }
      // Send the user details as JSON response
      res.json(customer);
    } catch (error) {
      // Handle errors when fetching user details
      console.error('Error fetching customer:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

    // Method to create a new customer
async createCustomer(req, res) {
    // Extract customer details from the request body
    const { userAddressId, firstName, lastName, email, password, phoneNumber } = req.body;

    try {
      // Create a new customer record in the database
      const customer = await Customer.create({
        user_address_id: userAddressId,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone_number: phoneNumber,
      });

      // Send the newly created customer as JSON response with status 201 (Created)
      res.status(201).json(customer);
    } catch (error) {
      // Handle errors when creating a customer
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Failed to create customer' });
    }
  },
  
  // Method to update customer details
   async updateCustomer(req, res) {
    // Extract the customer ID from the request parameters and customer details from the request body
    const customerId = req.params.id;
    const { userAddressId, firstName, lastName, email, password, phoneNumber } = req.body;

    try {
      // Fetch the customer by ID
      const customer = await Customer.findByPk(customerId);

      if (!customer) {
        // If the customer is not found, return an error response
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Update customer details
      customer.user_address_id = userAddressId;
      customer.first_name = firstName;
      customer.last_name = lastName;
      customer.email = email;
      customer.password = password;
      customer.phone_number = phoneNumber;

      // Save the updated customer details to the database
      await customer.save();

      // Send the updated customer details as JSON response
      res.json(customer);
    } catch (error) {
      // Handle errors when updating customer details
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Failed to update customer' });
    }
  },

  // Method to delete a customer by ID
  async deleteCustomer(req, res) {
    // Extract the customer ID from the request parameters
    const customerId = req.params.id;

    try {
      // Fetch the customer by ID
      const customer = await Customer.findByPk(customerId);

      if (!customer) {
        // If the customer is not found, return an error response
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Delete the customer record from the database
      await customer.destroy();

      // Send a success message as JSON response
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      // Handle errors when deleting customer
      console.error('Error deleting customer:', error);
      res.status(500).json({ error: 'Failed to delete customer' });
    }
  },
};

// Export the customerController object so that it can be used elsewhere in your application
module.exports = customerController;


