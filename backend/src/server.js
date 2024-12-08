import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

dotenv.config();

const app = express();
app.use(express.json());

// Conectar ao banco de dados
(async () => {
    try {
        await sequelize.sync();
        console.log('Database connected!');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
