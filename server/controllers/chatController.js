const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      sender: req.user._id,
      receiver: req.params.userId,
      text: req.body.text
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
    .populate('sender', 'name profilePic')
    .populate('receiver', 'name profilePic')
    .sort({ createdAt: -1 });

    const seen = new Set();
    const conversations = messages.filter(msg => {
      const otherId = msg.sender._id.toString() === req.user._id.toString()
        ? msg.receiver._id.toString()
        : msg.sender._id.toString();
      if (seen.has(otherId)) return false;
      seen.add(otherId);
      return true;
    });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages, getConversations };