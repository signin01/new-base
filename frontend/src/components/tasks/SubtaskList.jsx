import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SubtaskList = ({ taskId, subtasks, onUpdate }) => {
  const [newSubtask, setNewSubtask] = useState('');

  const toggleSubtask = async (index, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/subtask/${index}`, { completed: !completed }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onUpdate();
    } catch (err) { toast.error('Failed'); }
  };

  const addSubtask = async () => {
    if (!newSubtask.trim()) return;
    // In real app, call backend to add subtask – simplified here
    toast.success('Subtask added (simulated)');
    setNewSubtask('');
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold">Subtasks</h4>
      {subtasks?.map((st, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input type="checkbox" checked={st.completed} onChange={() => toggleSubtask(idx, st.completed)} />
          <span className={st.completed ? 'line-through' : ''}>{st.title}</span>
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <input type="text" value={newSubtask} onChange={e => setNewSubtask(e.target.value)} placeholder="New subtask" className="border p-1 rounded" />
        <button onClick={addSubtask} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
      </div>
    </div>
  );
};
export default SubtaskList;
