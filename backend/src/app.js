import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';

dotenv.config();

const app = express();

// Configuração do middleware
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

export default app;
