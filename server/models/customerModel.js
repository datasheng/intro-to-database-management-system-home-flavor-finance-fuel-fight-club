// // Import necessary modules
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); 

// // Define Customer model schema
// const Customer = sequelize.define('Customer', {
//   // Define attributes
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   user_address_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'user_address', 
//       key: 'id'
//     }
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
//     type: DataTypes.STRING(30)
//   }
// });

// //This creates a connection to the database

// let mysql = require('mysql');

// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// //This part calls the stored procedure userRegistration 

// connection.connect((err) => {
//   if (err) return console.error(err.message);

//   let sql = `CALL userRegistration(?,?,?,?,?)`;

//   connection.query(sql, [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.phone_number], (error, results, fields) => {
//     if (error) return console.error(error.message);

//     console.log(results);
//   });

//   // close the database connection
//   connection.end();
// });

// // Export the Customer model
// module.exports = Customer;
