const mysql = require('mysql2');

// Setup a connection pool using the promise-based API
const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'db-csc-336.cd68y0a605xf.us-east-2.rds.amazonaws.com',
    user: 'adminsOnly',       
    password: 'blahblah4',       
    database: 'db_project', 
    port: 3306         
}).promise();  // Use promise() to get a promise-based interface

// Function to execute SQL queries using the pool with execute method for prepared statements
const execute = async (sql, parameters) => {
    return await pool.execute(sql, parameters);
};

// Function to execute SQL queries using the pool with query method for regular queries
const query = async (sql, parameters) => {
    return await pool.query(sql, parameters);
};

module.exports = {
    execute,
    query
};