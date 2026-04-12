const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);  // Signup
router.post('/login', loginUser);        // Login
router.post('/logout', logoutUser);      // Logout
router.get('/me', protect, getMe);       // Apni profile dekho

module.exports = router;