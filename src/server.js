
const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/database");
const { connectRedis, testRedisConnection } = require("./config/redis");

const startServer = async () => {
    try {
        await connectDatabase();
        await connectRedis();
        await testRedisConnection();

        app.listen(env.port, () => {
            console.log(`Server running on port ${env.port}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();