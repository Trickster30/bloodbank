const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  try {
    const request = new Request({ ...req.body });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'pending',requestCategory: 'donor'}).populate('userId', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ 
      userId: req.params.userId,
      requestCategory: 'donor'
    }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const request = await Request.findByIdAndUpdate(id, { status }, { new: true });
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    // TODO: Send notification to user about status update
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


