// Import the express library to create server routes.
const express = require('express');
// Create a router object to handle different URL paths.
const router = express.Router();
// Import the bcrypt library for secure password hashing.
const bcrypt = require('bcrypt');

const db = require('../helpers/database');

// Import middleware functions from the authMiddleware file.
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('User route is working');
});

module.exports = router;

// POST route for registering a new user.
router.post('/register', async (req, res) => {
    res.json({ msg: "Register a new user", userDetails: req.body })
    // Extract user details from the request body.
    const { first_name, last_name, email, password, phone_number, user_address_id } = req.body;
    // Define the complexity of the hash calculation (more rounds = more secure, but slower).
    const saltRounds = 10;
    try {
        // Hash the password securely using bcrypt.
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Insert the new user's details into the database.
        db.query(
            "INSERT INTO customer (user_address_id, first_name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)",
            [user_address_id, first_name, last_name, email, hashedPassword, phone_number],
            (err, result) => {
                // Check for errors during the database operation.
                if (err) {
                    // If an error occurs, return a server error response.
                    return res.status(500).json({ message: "Error registering new user", error: err });
                }
                // If successful, send a response indicating the user was created.
                res.status(201).json({ message: "User registered successfully" });
            }
        );
    } catch (error) {
        // Handle any errors during the password hashing process.
        res.status(500).json({ message: "Server error while registering", error: error });
    }
});

// POST route for user login.
router.post('/login', authMiddleware);

// GET route for the home page, potentially protected by authentication.
router.get('/home', authMiddleware);

// GET route to access a user's profile, protected to ensure user is authenticated.
router.get('/profile', (req, res) => {
    // Check if the user object exists (i.e., the user is authenticated).
    if (req.user) {
        // If authenticated, return user details.
        res.status(200).json({ user: req.user });
    } else {
        // If not authenticated, respond with unauthorized status.
        res.status(401).json({ message: "Unauthorized" });
    }
});

// DELETE route to remove a user by their ID.
router.delete('/:id', authMiddleware, (req, res) => {
    res.json({ msg: "delete a user", userDetails: req.body })
    // Retrieve the user ID from the URL parameter.
    const { id } = req.params;
    // Check if the user has permission to delete the account (self or admin).
    if (req.user.id !== id && !req.user.isAdmin) {
        // Deny access if the user is neither the account owner nor an admin.
        return res.status(403).json({ message: "Unauthorized to perform this action" });
    }

    // Execute a SQL query to delete the user from the database.
    db.query('DELETE FROM customer WHERE id = ?', [id], (err, result) => {
        // Check for database errors.
        if (err) {
            // Return a server error if something goes wrong during the delete.
            return res.status(500).json({ message: "Database error deleting user", error: err });
        }
        // Check if any record was actually deleted.
        if (result.affectedRows === 0) {
            // If no records were deleted, indicate the user was not found.
            return res.status(404).json({ message: "User not found" });
        }
        // If successful, confirm deletion.
        res.status(200).json({ message: "User deleted successfully" });
    });
});

// Export the router so it can be used by other parts of the application.
module.exports = router;