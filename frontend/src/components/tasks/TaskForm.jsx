import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTaskStore from '../../store/taskStore';

const TaskForm = ({ initialData, onClose }) => {
  const { addTask, updateTask } = useTaskStore();
  const [form, setForm] = useState({ title: '', description: '', dueDate: new Date(), priority: 'medium', status: 'todo' });

  useEffect(() => { if (initialData) setForm({ ...initialData, dueDate: new Date(initialData.dueDate) }); }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData) await updateTask(initialData._id, form);
    else await addTask(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md"><h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full p-2 border rounded" />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows="3" className="w-full p-2 border rounded" />
          <DatePicker selected={form.dueDate} onChange={date => setForm({ ...form, dueDate: date })} className="w-full p-2 border rounded" />
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="w-full p-2 border rounded"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full p-2 border rounded"><option value="todo">To Do</option><option value="in-progress">In Progress</option><option value="review">Review</option><option value="done">Done</option></select>
          <div className="flex justify-end space-x-2"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button></div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
