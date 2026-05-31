const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// Only admin can list all users
router.get('/users', protect, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Only admin or manager can delete any task (already in task controller)
module.exports = router;
