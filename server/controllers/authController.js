const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    const result =await user.save();
    console.log('result: ', result);
    res.status(201).json({  user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('password: ', password);
    console.log('email: ', email);
    const user = await User.findOne({ email });
    console.log('user: ', user);
    if (!user) {
      return res.status(400).json({ error: 'No User Found' });
    }
 
    if (password != user.password) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

