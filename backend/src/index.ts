import "express-async-errors";
import "reflect-metadata";
import config from "./config";
import app from "./server";
import "./database";
import logger from "./logs";

app.listen(config.app.port, () => {
    logger.info({ message: `Server running on ${config.app.ssl ? "https" : "http"}//${config.app.host}:${config.app.port}`});
});
