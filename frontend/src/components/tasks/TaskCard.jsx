import React from 'react';
import { format } from 'date-fns';

const priorityColors = { low: 'bg-green-100 text-green-800', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-orange-100 text-orange-800', urgent: 'bg-red-100 text-red-800' };
const statusColors = { todo: 'bg-gray-100 text-gray-800', 'in-progress': 'bg-blue-100 text-blue-800', review: 'bg-purple-100 text-purple-800', done: 'bg-green-100 text-green-800' };

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-start"><h3 className="text-xl font-semibold">{task.title}</h3><div><button onClick={() => onEdit(task)} className="text-blue-600 mr-2">✏️</button><button onClick={() => onDelete(task._id)} className="text-red-600">🗑️</button></div></div>
      <p className="text-gray-600 mt-2 line-clamp-2">{task.description}</p>
      <div className="mt-3 flex flex-wrap gap-2"><span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>{task.priority}</span><span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]}`}>{task.status}</span><span className="text-xs text-gray-500">Due: {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'No date'}</span></div>
    </div>
  );
};

export default TaskCard;
