// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define Payment model schema
const Payment = sequelize.define('Payment', {
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_address', 
      key: 'id'
    }
  },
  credit_card_number: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  cvc: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  expiration_date: {
    type: DataTypes.STRING(5),
    allowNull: false
  }
});

// Define any model methods or associations here

// Export the Payment model
module.exports = Payment;
