const { createClient } = require("redis");
const env = require("./env");

let redisClient = null;

if (env.redisUrl) {
    try {
        new URL(env.redisUrl);
        redisClient = createClient({
            url: env.redisUrl,
            socket: {
                reconnectStrategy: false,
            },
        });
    } catch {
        console.warn("Redis is disabled. REDIS_URL must be a valid redis:// URL.");
    }
}

if (redisClient) {
    redisClient.on("error", (error) => {
        console.warn(`Redis unavailable: ${error.message}`);
    });

    redisClient.on("connect", () => {
        console.log("Redis connecting...");
    });

    redisClient.on("ready", () => {
        console.log("Redis connected successfully");
    });
}

const connectRedis = async () => {
    if (!redisClient) {
        console.warn("Redis is disabled. Set REDIS_URL to enable it.");
        return false;
    }

    if (!redisClient.isOpen) {
        try {
            await redisClient.connect();
        } catch {
            return false;
        }
    }

    return redisClient.isReady;
};

const testRedisConnection = async () => {
    if (!redisClient || !redisClient.isReady) {
        return false;
    }

    try {
        await redisClient.set("test:key", "Hello Redis Cloud");
        const value = await redisClient.get("test:key");
        console.log("Redis test value:=====>", value);
        return true;
    } catch (error) {
        console.warn(`Redis test failed: ${error.message}`);
        return false;
    }
};

module.exports = {
    redisClient,
    connectRedis,
    testRedisConnection,
};