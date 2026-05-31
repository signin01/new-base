const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validate, taskValidation } = require('../middleware/validation');
const upload = require('../middleware/upload');

router.route('/')
  .get(protect, getTasks)
  .post(protect, upload.array('attachments'), validate(taskValidation.create), createTask);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
