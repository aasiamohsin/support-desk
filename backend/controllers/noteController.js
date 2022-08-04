const User = require('../models/userModels');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');
const asyncHandler = require('express-async-handler');

// @desc Get notes of a Tickets
// @route GET get/api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user with JWT which includes user id
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found.');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized.');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc create notes of a Tickets
// @route POST post/api/tickets/:ticketId/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  // Get user with JWT which includes user id
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found.');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized.');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
    ticket: req.params.ticketId,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  createNote,
};
