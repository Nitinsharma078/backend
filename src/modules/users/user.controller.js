const authService = require("./user.service");
const getMe = async (req, res, next) => {
    try {
        const user = await authService.getMe(req, res, next);
        return user;
    } catch (error) {
        next(error);
    }
};
const redisTest = async (req, res, next) => {
    try {
        const result = await authService.redisTest();
        return res.json({
            success: true,
            message: "Redis is working",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getMe,
    redisTest,
};