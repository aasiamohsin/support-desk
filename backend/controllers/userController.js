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
  res.send('Register User.');
});

// @desc Login user
// @route /api/users/login
// access public
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login User.');
});

module.exports = {
  registerUser,
  loginUser,
};
