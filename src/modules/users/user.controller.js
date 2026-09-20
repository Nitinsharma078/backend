const authService = require("./user.service");
const getMe = async (req, res, next) => {
    try {
        const user = await authService.getMe(req, res, next);
        return user;
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getMe,
};