
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);


