const Booking = require('../models/bookings');

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.send(bookings);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching bookings', error });
    }
}

const createBooking = async (req, res) => {
    try {
        // Create a new booking with the provided data
        const booking = new Booking(req.body);

        // Save the new booking to the database
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send({ message: 'Error creating booking', error });
    }
}

const getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId });
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching bookings', error });
    }
}

const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            res.status(404).send('Booking not found');
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ message: 'Error deleting booking', error });
    }
}

const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id, // Use booking _id to find the document
            req.body, 
            { new: true } // Return the updated booking
        );

        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ message: 'Error updating booking', error });
    }
}

module.exports = {
    getBookings,
    createBooking,
    getBookingsByUser,
    deleteBooking,
    updateBooking
}