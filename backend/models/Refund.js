const mongoose = require('mongoose');

const RefundSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  reason: { type: String, required: true },
  amount: { type: Number, required: true },
  comments: { type: String },
  images: { type: [String] }, 
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Refund = mongoose.model('Refund', RefundSchema);

module.exports = Refund;
