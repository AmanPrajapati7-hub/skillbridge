const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:userId', protect, sendMessage);
router.get('/:userId', protect, getMessages);

module.exports = router;