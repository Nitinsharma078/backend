const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id.toString(),
        },
        env.jwtAccessSecret,
        {
            expiresIn: env.jwtAccessExpires,
        }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user._id.toString(),
        },
        env.jwtRefreshSecret,
        {
            expiresIn: env.jwtRefreshExpires,
        }
    );
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, env.jwtAccessSecret);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
};