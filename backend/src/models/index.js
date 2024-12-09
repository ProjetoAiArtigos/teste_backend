import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import config from "../config/config.js";

dotenv.config();

let __filename;
let __dirname;

try {
    // Define __filename e __dirname para ES Modules
    __filename = fileURLToPath(import.meta.url);
    __dirname = dirname(__filename);
} catch (err) {
    // Fallback para ambientes onde import.meta.url não é suportado
    __filename = '';
    __dirname = '';
}

const models = {};
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
});

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

Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
