import session from "express-session";
import config from "../config";
import { store } from "../cache";

const configSession = session({
    secret: config.auth.session,
    resave: false,
    saveUninitialized: true,
    store: store,
})

export default configSession;