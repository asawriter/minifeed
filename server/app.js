import express from 'express';
import session from 'express-session';
import cors from "cors"
import { CORS_OPTIONS, SESSION_OPTIONS } from './configs/index.js';
import { routes } from './routes/index.js';
// import { statusActive } from './middlewares/auth.js';

export const createApp = (store) => {
    const app = express();

    app.use(express.json());
    app.use(cors(CORS_OPTIONS))

    app.use(session({
        ...SESSION_OPTIONS,
        store
    }))

    app.use(routes());

    // app.use(statusActive);

    return app;
}