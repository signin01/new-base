router.put('/:id/subtask/:subtaskIndex', protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Unauthorized' });
  task.subtasks[req.params.subtaskIndex].completed = req.body.completed;
  await task.save();
  res.json(task);
});
