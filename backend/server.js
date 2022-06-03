// Import express module to ctreate express app
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');

// Initialize App
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Loads env file contents into process.env
const dotenv = require('dotenv').config();

// Initializing port
const PORT = process.env.PORT || 8000;

// Returns response
app.get('/', (req, res) =>
  res.status(200).json({ message: 'Welcome to Support Desk!' })
);

app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

// Listen for port/connection and returns server
app.listen(PORT, () => console.log(`Server Started on port  ${PORT}`));
