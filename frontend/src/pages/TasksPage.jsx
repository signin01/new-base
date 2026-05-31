import React, { useEffect, useState } from 'react';
import useTaskStore from '../store/taskStore';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import { motion } from 'framer-motion';

const TasksPage = () => {
  const { tasks, fetchTasks, deleteTask } = useTaskStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => { fetchTasks(); }, []);

  const handleEdit = (task) => { setEditingTask(task); setShowForm(true); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center"><h1 className="text-3xl font-bold">All Tasks</h1><button onClick={() => { setEditingTask(null); setShowForm(true); }} className="bg-blue-600 text-white px-6 py-2 rounded-lg">+ New Task</button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={deleteTask} />)}
      </div>
      {showForm && <TaskForm initialData={editingTask} onClose={() => { setShowForm(false); setEditingTask(null); }} />}
    </motion.div>
  );
};

export default TasksPage;
