const mysql = require('mysql2');

// Setup a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // The maximum number of connections to create at once
    host: 'db-csc-336.cd68y0a605xf.us-east-2.rds.amazonaws.com',    // Your database host
    user: 'adminsOnly',         // Your database username
    password: 'blahblah4',         // Your database password
    database: 'db_project', // Your database name
    port: 3306            // Your database port
});

// Function to execute SQL queries using the pool
const query = (sql, parameters) => new Promise((resolve, reject) => {
    pool.query(sql, parameters, (error, results) => {
        if (error) reject(error);
        else resolve(results);
    });
});

// Export the query function for use in other parts of your application
module.exports = {
    query
};

// okayyyyyyyy