const User = require('../models/userModels');
const Ticket = require('../models/ticketModel');
const asyncHandler = require('express-async-handler');

// @desc Get User Tickets
// @route get/api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'getTickets',
  });
});

// @des Post/Create User Ticket
// @route post/api/createTicket
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({
    messsage: 'createTicket',
  });
});

module.exports = {
  getTickets,
  createTicket,
};
