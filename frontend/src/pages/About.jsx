import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiTarget } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About CollabFlow</h1>
          <p className="text-gray-600 text-lg">Empowering teams to achieve more together</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            CollabFlow was born from a simple idea: make project management intuitive, beautiful, and actually enjoyable. We believe that teams perform best when they have the right tools – tools that don't get in the way. Our platform combines powerful features with a clean interface, so you can focus on what matters: creating amazing work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center">
            <FiAward className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Built for Teams</h3>
            <p className="text-gray-600 text-sm">Designed for modern remote and hybrid teams</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center">
            <FiHeart className="text-4xl text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">User‑Centric</h3>
            <p className="text-gray-600 text-sm">Every feature is crafted with user experience in mind</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center">
            <FiTarget className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Goal Oriented</h3>
            <p className="text-gray-600 text-sm">Track progress and hit your milestones faster</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
