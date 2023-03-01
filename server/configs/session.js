const RedisStore = require("connect-redis").default;
const redisClient = require("./redis");

const SESSION_NAME = 'sid'
const SESSION_ABSOLUTE_TIMEOUT = 1000 * 60 * 60 * 24;

const SESSION_OPTIONS = {
  name: SESSION_NAME,
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  },
  store: new RedisStore({ client: redisClient }),
};

module.exports = {SESSION_OPTIONS, SESSION_NAME, SESSION_ABSOLUTE_TIMEOUT};
