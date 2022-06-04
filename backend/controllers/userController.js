const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const asyncHandler = require('express-async-handler');

// @desc Register new user
// @route /api/users
// access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // return res.status(400).json({ message: 'Please include all fields.' });
    res.status(400);
    throw new Error('Please include all fields.');
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  // If user exists
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user credentials.');
  }
});

// @desc Login user
// @route /api/users/login
// access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid user credentials.');
  }
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
};
