import swaggerJsDoc from "swagger-jsdoc";
import config from "../config";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: config.app.name,
            version: "1.0.0",
            description: "Projeto base",
        },
        servers: [
            {
                url: (config.app.ssl ? "https" : "http") + "://localhost:" + config.app.port,
            },
            {
                url: (config.app.ssl ? "https" : "http") + "://" + config.app.host + ":" + config.app.port,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/index.ts'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);