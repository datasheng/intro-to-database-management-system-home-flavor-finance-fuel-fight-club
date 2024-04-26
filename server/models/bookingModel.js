// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

// Define Booking model schema
const Booking = sequelize.define('Booking', {
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Customer', 
      key: 'id'
    }
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Provider', 
      key: 'id'
    }
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Service', 
      key: 'id'
    }
  },
  service_location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ServiceLocation', 
      key: 'id'
    }
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Payment', 
      key: 'id'
    }
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  booking_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
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

//This calls the store procedure createBooking

connection.connect((err) => {
  if (err) return console.error(err.message);

  let sql = `CALL createBooking(?,?,?,?,?,?,?,?)`;

  connection.query(sql, [req.body.customer_id, req.body.provider_id, req.body.service_id, req.body.service_location_id, req.body.payment_id, req.body.start_time, req.body.end_time, req.body.booking_time], (error, results, fields) => {
    if (error) return console.error(error.message);

    console.log(results);
  });

  // close the database connection
  connection.end();
});

//This calls the store procedure cancelBooking

connection.connect((err) => {
    if (err) return console.error(err.message);
  
    let sql = `CALL cancelBooking(?)`;
  
    connection.query(sql, [req.body.booking_id], (error, results, fields) => {
      if (error) return console.error(error.message);
  
      console.log(results);
    });
  
    // close the database connection
    connection.end();
  });


// Export the Booking model
module.exports = Booking;
