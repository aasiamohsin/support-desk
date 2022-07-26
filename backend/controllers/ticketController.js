const User = require('../models/userModels');
const Ticket = require('../models/ticketModel');
const asyncHandler = require('express-async-handler');

// @desc Get User Tickets
// @route get/api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user with JWT which includes user id
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found.');
  }

  const ticket = await Ticket.find({
    user: req.user.id,
  });

  res.status(200).json(ticket);
});

// @desc Get User Ticket
// @route get/api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found.');
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found.');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized.');
  }

  res.status(200).json(ticket);
});

// @desc Delete User Ticket
// @route delete/api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found.');
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found.');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized.');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc Update User Ticket
// @route put/api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('USer not found.');
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found.');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized.');
  }

  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateTicket);
});

// @des Post/Create User Ticket
// @route post/api/createTicket
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error('Please add your product and description.');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found.');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
  createTicket,
};
