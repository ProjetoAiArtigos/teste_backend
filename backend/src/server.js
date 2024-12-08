import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sincronizar os modelos
        await db.sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
})();
