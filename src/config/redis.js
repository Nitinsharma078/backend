const { createClient } = require("redis");
const env = require("./env");

const redisClient = createClient({
    url: env.redisUrl,
});

redisClient.on("error", (error) => {
    console.error("Redis Error:", error);
});

redisClient.on("connect", () => {
    console.log("Redis connecting...");
});

redisClient.on("ready", () => {
    console.log("Redis connected successfully");
});

const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

module.exports = {
    redisClient,
    connectRedis,
};