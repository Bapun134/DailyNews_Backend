const User = require('../models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

// register
exports.registerFunction = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: 'Email already Registered' });
    }

    //hash-coding the password
    const hashPassword = await bcrypt.hashSync(password,10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    // Register Successful , .we are sending a response
    res.status(201).json({ message: 'Registration Successful' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// login
exports.loginFunction = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }

    // Login successful, we are sending a response
    res.json({ user: { name: user.name } });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
