// Import express module to ctreate express app
const express = require('express');

// Initialize App
const app = express();

// Loads env file contents into process.env
const dotenv = require('dotenv').config();

// Initializing port
const PORT = process.env.PORT || 8000;

// Returns response
app.get('/', (req, res) =>
  res.status(200).json({ message: 'Welcome to Support Desk!' })
);

// Listen for port/connection and returns server
app.listen(PORT, () => console.log(`Server Started on port  ${PORT}`));
