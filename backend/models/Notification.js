const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['task_assigned', 'mention', 'team_invite', 'comment', 'project_update'], required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  relatedId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
