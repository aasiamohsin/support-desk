// Import express module to ctreate express app
const path = require('path');
const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Loads env file contents into process.env
const dotenv = require('dotenv').config();

// Initializing port
const PORT = process.env.PORT || 8000;

// Connect  to database
connectDB();

// Initialize App
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/tickets', require('./routes/ticketsRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
} else {
  // Returns response
  app.get('/', (req, res) =>
    res.status(200).json({ message: 'Welcome to Support Desk!' })
  );
}

app.use(errorHandler);

// Listen for port/connection and returns server
app.listen(PORT, () => console.log(`Server Started on port  ${PORT}`));
