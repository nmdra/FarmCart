const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
},
{timestamps: true}
);

const ticketModel = mongoose.model('Ticket', ticketSchema);
module.exports = ticketModel;