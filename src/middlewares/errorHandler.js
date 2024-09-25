const { logger } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    logger.error(err.message, { stack: err.stack, statusCode });

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = errorHandler;



