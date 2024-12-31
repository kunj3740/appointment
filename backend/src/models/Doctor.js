const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Doctor's name
  specialization: { type: String, required: true },
  consultationFee: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
  },
  firstTimeDiscount: {
    percentage: { type: Number, required: true },
    maxAmount: { type: Number, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
