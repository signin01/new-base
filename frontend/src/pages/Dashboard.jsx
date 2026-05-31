import React, { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useTaskStore from '../store/taskStore';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useAuthStore();
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    urgent: tasks.filter(t => t.priority === 'urgent').length,
  };

  const chartData = {
    labels: ['To Do', 'In Progress', 'Review', 'Done'],
    datasets: [{
      label: 'Tasks',
      data: [stats.todo, stats.inProgress, tasks.filter(t => t.status === 'review').length, stats.done],
      backgroundColor: ['#f97316', '#3b82f6', '#eab308', '#22c55e'],
    }],
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
      
      {/* Stats Grid - Fixed alignment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">In Progress</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-600">{stats.done}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Urgent</p>
          <p className="text-3xl font-bold text-red-600">{stats.urgent}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
        <div className="h-80">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
