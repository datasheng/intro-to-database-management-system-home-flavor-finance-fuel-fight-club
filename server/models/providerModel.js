// // Import necessary modules
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); 

// // Define Provider model schema
// const Provider = sequelize.define('Provider', {
//   // Define attributes
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   first_name: {
//     type: DataTypes.STRING(250),
//     allowNull: false
//   },
//   last_name: {
//     type: DataTypes.STRING(250),
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING(250),
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING(250),
//     allowNull: false
//   },
//   phone_number: {
//     type: DataTypes.STRING(30),
//     allowNull: false
//   },
//   pay_per_booking: {
//     type: DataTypes.DECIMAL(7, 2),
//     allowNull: false
//   }
// });

// // Define any model methods or associations here

// // Export the Provider model
// module.exports = Provider;
