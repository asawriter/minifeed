import { IN_PROD } from "./app.js";

const ONE_HOUR = 1000 * 60 * 60;

const THIRTY_MINUTES = ONE_HOUR / 2;

const SIX_HOURS = ONE_HOUR * 6;

export const {
    SESSION_NAME = 'sid',
    SESSION_SECRET = 'sdnfls',
    SESSION_TIMEOUT_IDLE = THIRTY_MINUTES
} = process.env;

export const SESSION_ABSOLUTE_TIMEOUT = SIX_HOURS;

export const SESSION_OPTIONS = {
    name : SESSION_NAME,
    secret : SESSION_SECRET,
    cookie : {
        httpOnly : true,
        maxAge : SESSION_TIMEOUT_IDLE,
        sameSite : true,
        secure : IN_PROD
    },
    resave : false,
    saveUninitialized : false,
}