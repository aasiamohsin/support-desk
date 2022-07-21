const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please add a product'],
      enum: ['iphone', 'iMac', 'Mac Book Pro', 'ipad', 'watch', 'airpods'],
    },
    description: {
      type: String,
      required: [true, 'Please enter the description of the issue.'],
    },
    status: {
      type: String,
      enum: ['new', 'opened', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
