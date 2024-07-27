const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  bloodType: { type: String, required: true },
  requestCategory: { type: String, enum: ['donor', 'receiver'], required: true },
  ailments: { type: String },
  unitsRequired: { type: Number },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);