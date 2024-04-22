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

  // Method to update user details
  async updateUser(req, res) {
    // Extract the user ID from the request parameters and user details from the request body
    const userId = req.params.id;
    const { firstName, lastName, email, /* other user details */ } = req.body;
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

  // Other controller methods like createUser, deleteUser, etc., can be added here
};

// Export the UserController object so that it can be used elsewhere in your application
module.exports = UserController;