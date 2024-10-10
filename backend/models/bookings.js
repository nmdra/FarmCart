// Booking Schema

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    ticketQuantity: {
      type: Number,
      required: true,
    },

    ticketType : {
      type : String,
      required : true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    specialRequest: String,
  }, { timestamps: true });
  
  const Booking = mongoose.model('Booking', bookingSchema);
  module.exports = Booking;
