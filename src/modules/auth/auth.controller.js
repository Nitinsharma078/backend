const authService = require("./auth.service");
const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await authService.login({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: { user, accessToken, refreshToken },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};