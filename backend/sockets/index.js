const socketio = require('socket.io');

let io;
const userSocketMap = new Map();

const initSocket = (server) => {
  io = socketio(server, {
    cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);
    
    socket.on('register', (userId) => {
      userSocketMap.set(userId, socket.id);
    });

    socket.on('join-task', (taskId) => {
      socket.join(`task-${taskId}`);
    });

    socket.on('task-update', (data) => {
      socket.to(`task-${data.taskId}`).emit('task-updated', data);
    });

    socket.on('disconnect', () => {
      for (let [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) userSocketMap.delete(userId);
      }
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
  return io;
};

const getIO = () => io;

module.exports = { initSocket, getIO };
