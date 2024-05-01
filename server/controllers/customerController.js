const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/database'); 

// A function to register a new customer
exports.registerCustomer = async (req, res) => {
    const { first_name, last_name, email, password, phone_number } = req.body;
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query = "INSERT INTO customer (first_name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?)";
        const values = [first_name, last_name, email, hashedPassword, phone_number];

        // Execute the command to save the customer
        await db.query(query, values);
        res.status(201).json({ message: "Customer registered successfully" });
    } catch (error) {
        console.error('Error registering customer: ', error);
        res.status(500).json({ message: "Server error while registering", error });
    }
};

// A function to help a customer log in
exports.loginCustomer = async (req, res) => {
  // Get the email and password the customer typed in
  const { email, password } = req.body;

  // Check if both email and password were provided
  if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password." });
  }

  try {
      // Prepare to look up the customer by their email
      const sql = 'SELECT * FROM customer WHERE email = ?';
      // Run the search in the database
      const [customers] = await db.execute(sql, [email]);

      // Check if we found a customer
      if (customers.length === 0) {
          return res.status(401).json({ message: 'Invalid credentials, no such customer found.' });
      }

      // Get the customer's details from the results
      const customer = customers[0];

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials, password does not match.' });
      }

      // Prepare a special access pass (JWT token) if the login is successful
      const payload = { customer: { id: customer.id, role: "customer" } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' },
          (err, token) => {
              if (err) throw err;
              // Send back the token and some details about the customer
              res.json({
                  token,
                  customer: { id: customer.id, name: customer.first_name + ' ' + customer.last_name, email: customer.email }
              });
          }
      );
  } catch (err) {
      // If there was a problem, tell the user there was a server error
      console.error(err.message);
      res.status(500).json({ message: 'Server error during the login process.' });
  }
};

// exports.getClassOptions = async (req, res) => {
//   // Get the service type from the user's request
//   const { serviceType } = req.query;

//   try {
//       // Prepare a SQL command to get all classes that match the service type
//       const query = "SELECT * FROM class WHERE service_type = ?";
//       const params = [serviceType];

//       // Execute the database query
//       db.query(query, params, (err, classes) => {
//           if (err) {
//               // If there is a problem with the database, tell the user
//               return res.status(500).json({ message: "Database error", error: err });
//           }

//           if (classes.length === 0) {
//               // If no classes are found, tell the user
//               return res.status(404).json({ message: "No classes found for the selected service type." });
//           }

//           // Prepare the data about the classes to send back to the user
//           const classOptions = classes.map(cls => ({
//               id: cls.id,
//               name: cls.name,
//               providerId: cls.provider_id,
//               startTime: cls.start_time,
//               endTime: cls.end_time,
//               cost: cls.cost 
//           }));

//           // Send the class data back to the user
//           res.json({
//               message: "Classes retrieved successfully",
//               classes: classOptions
//           });
//       });
//   } catch (error) {
//       // If something goes wrong, tell the user there was a server error
//       res.status(500).json({ message: "Server error while fetching classes", error });
//   }
// };

exports.getClassOptions = async (req, res) => {
    const { serviceType } = req.query; // Assuming the service type is sent as a query parameter

    try {
        // Query to select service IDs from the service table where service type matches (case-insensitive)
        const serviceQuery = `SELECT id FROM service WHERE LOWER(service_type) = LOWER(?)`;
        const [services] = await db.query(serviceQuery, [serviceType]);

        // Extract service IDs
        const serviceIds = services.map(service => service.id);

        // if (serviceIds.length === 0) {
        //     res.status(404).send('No services found for the specified type.');
        //     return;
        // }

        // Generate placeholders for each ID in the serviceIds array
        const placeholders = serviceIds.map(() => '?').join(', ');

        // Query to select class types from the service table where service ID is in the fetched service IDs
        const classTypeQuery = `SELECT DISTINCT s.class_type FROM service s JOIN class c ON s.id = c.service_id WHERE c.service_id IN (${placeholders})`;
        const [classTypes] = await db.query(classTypeQuery, serviceIds);

        if (classTypes.length === 0) {
            res.status(404).send('No class types found for the selected services.');
            return;
        }

        // Sending the class types as a response
        res.json(classTypes.map(ct => ct.class_type));
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error processing your request');
    }
};

exports.getSessionOptions = async (req, res) => {
  // Get the class type from the user's request
  const { classType } = req.query;

  try {
      // Prepare a SQL command to find sessions for this class type that are upcoming
      const query = "SELECT DISTINCT start_time FROM classes WHERE class_type = ? AND start_time >= NOW() ORDER BY start_time";
      const params = [classType];

      // Execute the database query
      db.query(query, params, (err, sessions) => {
          if (err) {
              // If there is a problem with the database, tell the user
              return res.status(500).json({ message: "Database error", error: err });
          }

          if (sessions.length === 0) {
              // If no sessions are found, tell the user
              return res.status(404).json({ message: "No available sessions found for the selected class type." });
          }

          // Prepare the session times to send back to the user
          const sessionOptions = sessions.map(session => ({
              startTime: session.start_time
          }));

          // Send the session data back to the user
          res.json({
              message: "Available sessions retrieved successfully",
              sessions: sessionOptions
          });
      });
  } catch (error) {
      // If something goes wrong, tell the user there was a server error
      res.status(500).json({ message: "Server error while fetching sessions", error });
  }
};

// A function to process payment and book a class
exports.processPayment = async (req, res) => {
  // We get all the necessary information from the user's input
  const { 
      customer_id, service_id, class_id, // IDs needed for the booking
      creditCardNumber, cvc, expirationDate, cardholderFirstName, cardholderLastName,
      addressOne, addressTwo, city, state, zipcode
  } = req.body;

  try {
      // First, we save the address information in the database
      const addressSql = 'INSERT INTO address (address_one, address_two, city, state, zipcode) VALUES (?, ?, ?, ?, ?)';
      const addressParams = [addressOne, addressTwo, city, state, zipcode];
      const [addressResult] = await db.execute(addressSql, addressParams);
      const addressId = addressResult.insertId;

      // Next, we save the payment information using the address ID we just created
      const paymentSql = 'INSERT INTO payment_info (address_id, credit_card_number, cvc, expiration_date, cardholder_first_name, cardholder_last_name) VALUES (?, ?, ?, ?, ?, ?)';
      const paymentParams = [addressId, creditCardNumber, cvc, expirationDate, cardholderFirstName, cardholderLastName];
      const [paymentResult] = await db.execute(paymentSql, paymentParams);
      const paymentInfoId = paymentResult.insertId;

      // Then, we record the booking details in the booking table
      const bookingSql = 'INSERT INTO booking (customer_id, service_id, class_id, payment_info_id) VALUES (?, ?, ?, ?)';
      const bookingParams = [customer_id, service_id, class_id, paymentInfoId];
      await db.execute(bookingSql, bookingParams);

      // Finally, we tell the user everything was successful
      res.json({
          message: "Payment and booking processed successfully",
          addressId: addressId,
          paymentInfoId: paymentInfoId,
          bookingId: bookingResult.insertId  // Assuming you want to return the booking ID
      });
  } catch (error) {
      // If something goes wrong, tell the user there was a server error
      console.error('Database error:', error);
      res.status(500).json({ message: 'Server error during the payment and booking process', error });
  }
};
