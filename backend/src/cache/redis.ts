import * as redis from "redis";
import config from "../config";
import logger from "../logs";

const client = redis.createClient({
    disableOfflineQueue: true,
    pingInterval: 60000,
    socket: {
        host: config.cache.host,
        port: config.cache.port,
        tls: config.cache.ssl
    },
    ...(config.cache.password ? { password: config.cache.password } : {}),
    ...(config.cache.username ? { username: config.cache.username } : {}),
})

client.on("error", function (error) {
    logger.error({ message: "Could not establish a connection with redis. ", error });
});

client.on("connect", function (err) {
    logger.info({ message: "Connected to redis successfully" });
});

(async () => { await client.connect().catch((error) => logger.error({ message: error.message, error })) })();

export default client;