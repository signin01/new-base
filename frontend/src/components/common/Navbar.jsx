import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { useDarkMode } from '../../context/DarkModeContext';
import { FiSun, FiMoon, FiGrid, FiMessageSquare, FiShoppingCart, FiBarChart2 } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CollabFlow
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Contact</Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 flex items-center gap-1"><FiBarChart2 /> Dashboard</Link>
                <Link to="/kanban" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 flex items-center gap-1"><FiGrid /> Kanban</Link>
                <Link to="/marketplace" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 flex items-center gap-1"><FiShoppingCart /> Marketplace</Link>
                <Link to="/chat" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 flex items-center gap-1"><FiMessageSquare /> Chat</Link>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
              </>
            )}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
              {darkMode ? <FiSun className="text-yellow-500" /> : <FiMoon className="text-gray-700" />}
            </button>
            {!user && (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
