const express = require('express');
const router = express.Router();

const { getBookings, createBooking, getBookingsByUser, deleteBooking, updateBooking } = require('../controller/bookingController.js');


// Get all bookings
router.get('/all', getBookings);

router.post('/create',createBooking);

router.get('/user/:userId', getBookingsByUser);

//delete booking
router.delete('/:id', deleteBooking);

// Update booking by _id
router.put('/:id', updateBooking);


module.exports = router;