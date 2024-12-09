import winston from "winston";
import config from "../config";

const logger = winston.createLogger({
    level: config.log.level,
    format: winston.format.json(),
    transports: [],
})

if (config.state.environment !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.simple()
        )
    }));
}

export default logger;