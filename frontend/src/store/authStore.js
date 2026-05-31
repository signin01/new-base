import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import API from '../services/api';
import toast from 'react-hot-toast';

const useAuthStore = create(persist((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      set({ user: { ...data.user, role: data.user.role || 'user' }, token: data.token, isLoading: false });
      toast.success('Logged in successfully');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      set({ isLoading: false });
      return false;
    }
  },
  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      set({ user: { ...data.user, role: data.user.role || 'user' }, token: data.token, isLoading: false });
      toast.success('Account created');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      set({ isLoading: false });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
    toast.success('Logged out');
  },
  fetchUser: async () => {
    try {
      const { data } = await API.get('/auth/me');
      set({ user: data.user });
    } catch (err) {
      get().logout();
    }
  }
}), { name: 'auth' }));

export default useAuthStore;
