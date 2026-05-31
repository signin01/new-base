const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, maxlength: 5000 },
  status: { type: String, enum: ['todo', 'in-progress', 'review', 'done'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  dueDate: Date,
  
  subtasks: [{ title: String, completed: { type: Boolean, default: false } }],
  dependsOn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  attachments: [{
    url: String,
    publicId: String,
    filename: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  timeEstimate: { type: Number, default: 0 }, // hours
  timeSpent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', taskSchema);

