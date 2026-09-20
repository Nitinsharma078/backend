const { connectRedis, testRedisConnection } = require("./redis");

const runRedisTest = async () => {
    const connected = await connectRedis();

    if (connected) {
        await testRedisConnection();
    }
};

runRedisTest();