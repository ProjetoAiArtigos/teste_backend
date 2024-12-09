import cors from "cors";
import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler, NextFunction, Response } from "express";
import swaggerUi from "swagger-ui-express";

import session from "./session";
import routes from "../routes";
import { IRequest } from "../types";
import { swaggerDocs } from "../docs/swagger";
import config from "../config";
import logger from "../logs"

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session);
app.use(routes);

if (config.state.environment === "development"){
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.use((req: IRequest, res: Response, next: NextFunction) => {
    res.status(404).send({ message: "Not found" });
});

app.use(((error: any, req: IRequest, res: Response, next: NextFunction) => {
    logger.error({ message: error.message, error });
    res.status(error.status || 500).send(config.state.environment === "development" ? { message: error.message } : {});
}) as ErrorRequestHandler);

export default app;