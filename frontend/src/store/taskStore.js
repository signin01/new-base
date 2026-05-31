import { create } from 'zustand';
import API from '../services/api';
import toast from 'react-hot-toast';

const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get('/tasks');
      set({ tasks: data.tasks, loading: false });
    } catch (err) {
      toast.error('Failed to load tasks');
      set({ loading: false });
    }
  },
  addTask: async (taskData) => {
    try {
      const { data } = await API.post('/tasks', taskData);
      set(state => ({ tasks: [data.task, ...state.tasks] }));
      toast.success('Task created');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
      return false;
    }
  },
  updateTask: async (id, updates) => {
    try {
      const { data } = await API.put(`/tasks/${id}`, updates);
      set(state => ({ tasks: state.tasks.map(t => t._id === id ? data.task : t) }));
      toast.success('Task updated');
      return true;
    } catch (err) {
      toast.error('Update failed');
      return false;
    }
  },
  deleteTask: async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      set(state => ({ tasks: state.tasks.filter(t => t._id !== id) }));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  },
}));

export default useTaskStore;
