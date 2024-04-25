// Import Sequelize models
const { User, Customer, Provider } = require('../models');

// Define UserController methods
const UserController = {
  // Method to get user details by ID
  async getUserById(req, res) {
    // Extract the user ID from the request parameters
    const userId = req.params.id;
    try {
      // Fetch the user details by ID, including related Customer and Provider data
      const user = await User.findByPk(userId, {
        include: [Customer, Provider], // Include related Customer and Provider models
      });
      if (!user) {
        // If the user is not found, return an error response
        return res.status(404).json({ error: 'User not found' });
      }
      // Send the user details as JSON response
      res.json(user);
    } catch (error) {
      // Handle errors when fetching user details
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

    // Method to create a new customer
  async createCustomer(req, res) {
    // Extract customer details from the request body
    const { userAddressId, firstName, lastName, email, password, phoneNumber /* other customer details */ } = req.body;
    try {
      // Create a new user record in the database
      const user = await User.create({
        userAddressId,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        /* other customer details */
      });

      // Send the newly created user as JSON response with status 201 (Created)
      res.status(201).json(user);
    } catch (error) {
      // Handle errors when creating a customer
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Failed to create customer' });
    }
  },

  // Method to update user details
  async updateUser(req, res) {
    // Extract the user ID from the request parameters and user details from the request body
    const userId = req.params.id;
    const { firstName, lastName, email, password, phoneNumber /* other user details */ } = req.body;
    try {
      // Fetch the user by ID
      const user = await User.findByPk(userId);
      if (!user) {
        // If the user is not found, return an error response
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user details
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.phoneNumber = phoneNumber;
      /* update other user details as needed */

      // Save the updated user details to the database
      await user.save();

      // Send the updated user details as JSON response
      res.json(user);
    } catch (error) {
      // Handle errors when updating user details
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  // Method to delete a user by ID
  async deleteUser(req, res) {
    // Extract the user ID from the request parameters
    const userId = req.params.id;
    try {
      // Fetch the user by ID
      const user = await User.findByPk(userId);
      if (!user) {
        // If the user is not found, return an error response
        return res.status(404).json({ error: 'User not found' });
      }

      // Delete the user record from the database
      await user.destroy();

      // Send a success message as JSON response
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      // Handle errors when deleting user
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },



  // Other controller methods like createUser, etc., can be added here
};

// Export the UserController object so that it can be used elsewhere in your application
module.exports = UserController;

