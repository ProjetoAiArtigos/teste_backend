import * as dotenv from "dotenv";
dotenv.config();
import { DatabaseType } from "typeorm";
import { level } from "winston";

const config = {
    state: {
        environment: process.env.NODE_ENV ? process.env.NODE_ENV.replace(/[\\"]/g, '').toLowerCase() : "production"
    },
    app: {
        name: process.env.APP_NAME ? process.env.APP_NAME.replace(/[\\"]/g, '') : "base_project",
        host: process.env.HOST ? process.env.HOST.replace(/[\\"]/g, '') : "localhost",
        port: process.env.PORT ? parseInt(process.env.PORT.replace(/[\\"]/g, '')) : 5000,
        ssl: process.env.SSL ? (/true/).test(process.env.SSL.replace(/[\\"]/g, '').toLowerCase()) : false
    },
    database: {
        type: process.env.DB_TYPE ? process.env.DB_TYPE.replace(/[\\"]/g, '').toLowerCase() as DatabaseType : "postgres" as DatabaseType,
        url: process.env.DB_URL ? process.env.DB_URL.replace(/[\\"]/g, '') : undefined,
        host: process.env.DB_HOST ? process.env.DB_HOST.replace(/[\\"]/g, '') : undefined,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT.replace(/[\\"]/g, '')) : undefined,
        username: process.env.DB_USERNAME ? process.env.DB_USERNAME.replace(/[\\"]/g, '') : undefined,
        password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.replace(/[\\"]/g, '') : undefined,
        database: process.env.DB_DATABASE ? process.env.DB_DATABASE.replace(/[\\"]/g, '') : undefined,
        ssl: process.env.DB_SSL ? (/true/).test(process.env.DB_SSL.replace(/[\\"]/g, '').toLowerCase()) : false
    },
    auth: {
        jwt: process.env.JWT_SECRET ? process.env.JWT_SECRET.replace(/[\\"]/g, '') : "secret",        
        session: process.env.SESSION_SECRET ? process.env.SESSION_SECRET.replace(/[\\"]/g, '') : "secret",
        token: process.env.PASSWORD_SECRET ? process.env.PASSWORD_SECRET.replace(/[\\"]/g, '') : "secret"
    },
    cache: {
        host: process.env.REDIS_HOST ? process.env.REDIS_HOST.replace(/[\\"]/g, '') : "localhost",
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT.replace(/[\\"]/g, '')) : 6379,
        username: process.env.REDIS_USERNAME ? process.env.REDIS_USERNAME.replace(/[\\"]/g, '') : undefined,
        password: process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD.replace(/[\\"]/g, '') : undefined,
        ssl: process.env.REDIS_SSL ? (/true/).test(process.env.REDIS_SSL.replace(/[\\"]/g, '').toLowerCase()) : false
    },
    log: {
        level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.replace(/[\\"]/g, '').toLowerCase() : "info"
    },
}

export default config;