const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  bloodType: { type: String },
  age: { type: Number },
  phoneNumber: { type: String },
  ailments: { type: String },
});


module.exports = mongoose.model('User', userSchema);