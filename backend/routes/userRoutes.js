const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');

router.post('/', registerUser);

router.post('/Login', loginUser);

module.exports = router;
