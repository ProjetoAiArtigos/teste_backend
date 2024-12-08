import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Resolvendo o __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const models = {};

// Configuração do Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Desativa logs do Sequelize
    }
);

// Carregar todos os modelos do diretório atual
const modelFiles = readdirSync(__dirname).filter(
    (file) =>
        file.indexOf('.') !== 0 &&
        file !== 'index.js' && // Ignorar este arquivo
        file.slice(-3) === '.js'
);

for (const file of modelFiles) {
    const modelPath = resolve(__dirname, file);
    const model = (await import(modelPath)).default;
    models[model.name] = model.init(sequelize);
}

// Configurar associações (se houver)
Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
