import app from './app.js';
import db from './models/index.js';

const PORT = process.env.PORT || 3001;

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
