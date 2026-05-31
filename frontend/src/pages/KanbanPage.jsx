import React from 'react';
import KanbanBoard from '../components/tasks/KanbanBoard';
import { motion } from 'framer-motion';

const KanbanPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>
      <KanbanBoard />
    </motion.div>
  );
};
export default KanbanPage;
