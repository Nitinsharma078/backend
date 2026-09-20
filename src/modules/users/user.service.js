const User = require("./user.model");
const { redisClient } = require("../../config/redis");

const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status,
                emailVerified: user.emailVerified,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};
const redisTest = async () => {
    if (!redisClient || !redisClient.isReady) {
        const error = new Error("Redis is unavailable");
        error.statusCode = 503;
        throw error;
    }

    await redisClient.set("test:name", "Nitin");
    const value = await redisClient.get("test:name");

    return { key: "test:name", value };
};
module.exports = {
    getMe,
    redisTest,
};