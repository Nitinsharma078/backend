const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
// const User = require("../users/user.model");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../../utils/jwt");

const register = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
    };
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    if (user.status !== "active") {
        const error = new Error("Your account is not active");
        error.statusCode = 403;
        throw error;
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    user.lastLoginAt = new Date();
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            status: user.status,
        },

        accessToken,
        refreshToken,
    };
};

module.exports = {
    register,
    login,
};