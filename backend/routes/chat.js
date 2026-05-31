const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

router.get('/messages/:room', protect, async (req, res) => {
  const messages = await Message.find({ room: req.params.room }).populate('sender', 'name avatar').sort('createdAt');
  res.json(messages);
});

router.post('/messages', protect, async (req, res) => {
  const { text, room } = req.body;
  const message = await Message.create({ sender: req.user.id, text, room });
  const populated = await message.populate('sender', 'name avatar');
  // Emit via socket (handled in socket logic)
  res.status(201).json(populated);
});

module.exports = router;
