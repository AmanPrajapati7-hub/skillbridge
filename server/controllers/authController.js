const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Saari fields bharo!' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered hai!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, email,
      password: hashedPassword,
      role: role || 'buyer'
    });

    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log('Register Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ya password galat hai!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ya password galat hai!' });
    }

    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log('Login Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie('token', '', { maxAge: 0 });
  res.json({ message: 'Logout ho gaye!' });
};

const getMe = async (req, res) => {
  res.json(req.user);
};

const updateProfile = async (req, res) => {
  try {
    const { name, description, skills, profilePic } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { 
        name: name,
        description: description,
        skills: skills,
        profilePic: profilePic
      },
      { new: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found!' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getMe, updateProfile, getUserById };