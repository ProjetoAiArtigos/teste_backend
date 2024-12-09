import { Logger, QueryRunner } from "typeorm";
import winston from "winston";
import logger from "../logs";

class DbLogger implements Logger {
    private readonly logger;

    constructor(logger: winston.Logger) {
        this.logger = logger
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        if (queryRunner?.data.isCreatingLogs) {
            return;
        }
        this.logger.info({ message: query, parameters });
        return;
    }

    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        if (queryRunner?.data.isCreatingLogs) {
            return;
        }
        this.logger.error({ message: query, error, parameters });
        return;
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        if (queryRunner?.data.isCreatingLogs) {
            return;
        }
        this.logger.error({ message: query, time, parameters });
        return;
    }

    logMigration(message: string, queryRunner?: QueryRunner): any {
        this.logger.warn({ message });
        return;
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        this.logger.warn({ message });
        return;
    }

    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
        if (queryRunner?.data.isCreatingLogs) {
            return;
        }
        if (level === "log") {
            this.logger.info({ message });
            return;
        }
        if (level === "info") {
            this.logger.debug({ message });
            return;
        }
        this.logger.warn({ message });
        return;
    }
}

const dbLogger = new DbLogger(logger)

export default dbLogger;