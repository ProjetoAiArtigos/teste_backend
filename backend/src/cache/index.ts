import RedisStore from "connect-redis";
import redis from "./redis";
import config from "../config";

const store = new RedisStore({ client: redis, prefix: config.app.name + ":" });

export { store, redis }