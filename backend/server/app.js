const express = require('express');
const dotenv = require('dotenv');
const mysql = require("mysql");
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json()); // For parsing application/json
app.use(cors());
const bcrypt = require('bcrypt');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Input your own sql workbench password
    database: '336-login',
    port: 3306
});

const saltRounds = 10; // Adjust according to security requirement

app.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        db.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error during signup:', err);
                return res.status(500).send({ message: "Internal Server Error", error: err.sqlMessage });
            }
            res.status(201).send({ message: "User Created Successfully" });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send({ message: "Error processing your request" });
    }
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        if (results.length > 0) {
            // Compare hashed password
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send({ message: "Internal Server Error" });
                }
                if (isMatch) {
                    res.send({ message: "Login Successful", user: results[0] });
                } else {
                    res.status(401).send({ message: "Wrong username or password" });
                }
            });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    });
});
app.listen(3001, () => {
    console.log("Server started on port 3001");
});





// Function to create MySQL connection
/*function createConnection() {
    return mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "root123",
        database: "336-login",
        pory: "3001",
        // Add this line to specify the authentication plugin explicitly
        authPlugins: {
            mysql_clear_password: () => () => Buffer.from('password')
        }
    });
}
app.get("/", (req,res)=>{
    res.send("<h1>Home Page</h1>")
});
// Function to handle MySQL connection errors
function handleDisconnect(connection) {
    connection.on('error', function(err) {
        console.log('MySQL error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            console.log('Reconnecting to MySQL...');
            // Recreate the connection
            db = createConnection();
            handleDisconnect(db);
            db.connect();
        } else {
            throw err;
        }
    });
}

// Create initial connection
let db = createConnection();
handleDisconnect(db);

app.get('/insert', (req, res) => {
    db.query('INSERT INTO class (className, population) VALUES ("Brazil", 200000)', (err, result) => {
        if (err) {
            console.error("Error occurred while inserting data:", err);
            res.status(500).send('Error occurred while inserting data.');
        } else {
            console.log("Data inserted successfully:", result);
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});*/