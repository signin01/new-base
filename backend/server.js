const dotenv = require('dotenv');
const path = require('path');

// Force load .env from current directory
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🔐 JWT_SECRET loaded:', process.env.JWT_SECRET ? '✅ YES' : '❌ NO');
if (!process.env.JWT_SECRET) {
  console.error('❌ FATAL: JWT_SECRET is missing. Check your .env file');
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { initSocket } = require('./sockets');
const http = require('http');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

connectDB();

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/teams', require('./routes/teams'));

app.get('/health', (req, res) => res.json({ status: 'OK' }));

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
