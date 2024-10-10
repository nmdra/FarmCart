const express = require('express');
const router = express.Router();

const { createTicket, getTicket, getTickets, updateTicket, deleteTicket } = require('../controller/ticketController.js');

// Route to create a new event/ticket
router.post('/add-ticket', createTicket);

router.get('/getTickets/:id',getTicket);

// Route to get all events/tickets
// Get all tickets
router.get('/getTickets', getTickets);

// Route to get a single event/ticket by ID


// Route to update an event/ticket by ID
router.put('/tickets/:id', updateTicket);

// Route to delete an event/ticket by ID
router.delete('/tickets/:id', deleteTicket);

module.exports = router;
