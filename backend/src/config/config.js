import dotenv from 'dotenv';

dotenv.config();

export default {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'desafio_tarefas',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'desafio_tarefas',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
    },
};
