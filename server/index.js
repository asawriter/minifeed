import RedisStore from "connect-redis";
import { Redis } from "ioredis";
import { APP_PORT } from "./configs/index.js";
import { createApp } from "./app.js";
import pool from "./db/connectDb.js";

const client = new Redis();

client
  .connect(() => console.log("Connected to Redis !!!"))
  .catch((err) => console.log("Error connecting to Redis !!!", err));

const store = new RedisStore({ client });

const app = createApp(store);

app.listen(APP_PORT, () => console.log("Server listening on port " + APP_PORT));
