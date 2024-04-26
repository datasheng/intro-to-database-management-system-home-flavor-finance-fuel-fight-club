// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

// Define Service model schema
const Service = sequelize.define('Service', {
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_cost: {
    type: DataTypes.DECIMAL(7, 2),
    allowNull: false
  },
  service_name: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
});

//This creates a connection to the database

let mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//This part calls the stored procedure totalRevenue

connection.connect((err) => {
  if (err) return console.error(err.message);

  let sql = `CALL totalRevenue()`;

  connection.query(sql, [], (error, results, fields) => {
    if (error) return console.error(error.message);

    console.log(results);
  });

  // close the database connection
  connection.end();
});

// Export the Service model
module.exports = Service;
