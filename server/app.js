// 1. Module imports\
require('dotenv').config(); 
const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');


const customerRoutes = require('./routes/customerRoutes');
const providerRoutes = require('./routes/providerRoutes');

const app = express();

app.use(express.json()); // For parsing application/json
app.use(cors()); // Enables CORS

app.use('/api/users', customerRoutes);
// Include any additional routes here...

// 6. Additional endpoints (optional, for direct testing or simple outputs)
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>")
});
app.get("/test", (req, res) => {
    res.send("Test route works!");
});


// 7. Error handling middleware
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

// 8. Server activation
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on port ${process.env.PORT || 3001}`);
});


// testing a lottttttt