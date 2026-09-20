const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));

        return res.status(400).json({
            success: false,
            message: "Database validation failed",
            errors,
        });
    }

    // MongoDB duplicate key
    if (err.code === 11000) {
        const fields = Object.keys(err.keyPattern || {});

        return res.status(409).json({
            success: false,
            message: `${fields.join(", ")} already exists`,
        });
    }

    // Default error
    return res.status(err.statusCode || 500).json({
        success: false,
        message:
            process.env.NODE_ENV === "development"
                ? err.message
                : "Internal server error",
    });
};

module.exports = errorHandler;