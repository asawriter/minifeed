const { Redis } = require("ioredis");

const redisClient = new Redis();

redisClient.on("connected", () => console.log("Connection established to redis"))

module.exports = redisClient;
