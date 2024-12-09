import { DataSource } from "typeorm";
import config from "../config";
import entities from "../entities";
import dbLogger from "./dbLogger";
import logger from "../logs";

let source: DataSource

switch (config.database.type) {
    case "postgres":
        source = new DataSource({
            type: config.database.type,
            ...(config.database.url ? {
                url: config.database.url
            } : {
                host: config.database.host || "localhost",
                port: config.database.port || 5432,
                ...(config.database.username ? { username: config.database.username } : {}),
                ...(config.database.password ? { password: config.database.password } : {}),
                ...(config.database.database ? { database: config.database.database } : {}),
            }),
            ssl: config.database.ssl || false,
            synchronize: true,
            logging: true,
            logger: dbLogger,
            migrationsTransactionMode: "all",
            entities: entities,
            migrations: ["../migrations/postgres/*{.js,.ts}"],
        })
        break;
    default:
        throw new Error("Cannot find database type.")
}

(async () => {
    await source.initialize()
        .then(() => {
            logger.info({ message: "Data Source has been initialized!" })
        })
        .catch((error) => {
            logger.error({ message: "Error during Data Source initialization: ", error })
        })

    await source.runMigrations()
        .then(() => {
            logger.info({ message: "Migrations has been finished!"})
        })
        .catch((error) => {
            logger.error({ message: "Error during migrations: ", error })
        })
})();

export const dataSource = source;