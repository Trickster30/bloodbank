const User = require('../models/User');
const Request = require('../models/Request');

exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Request.find({
      status: 'approved',
      requestCategory: 'donor'
    }).select('-password');

    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addDonor = async (req, res) => {
  try {
    const { name, age, email, phoneNumber, bloodType, ailments ,userId} = req.body;
    const request = new Request({
      name,
      age,
      email,
      phoneNumber,
      bloodType,
      ailments,
      requestCategory: 'donor',
      status: 'approved',
      userId, 
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDonor = async (req, res) => {
  try {
    console.log('req.params.id: ', req.params.id);
    const donor = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) {
      return res.status(500).json({ error: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Request.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(500).json({ error: 'Donor not found' });
    }
    res.json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};