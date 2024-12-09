import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';

dotenv.config();

const app = express();

app.use(cors());

// Configuração do middleware
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

export default app;
