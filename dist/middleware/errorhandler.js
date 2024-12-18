"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    let statusMessage;
    switch (statusCode) {
        case 401:
            statusMessage = "Validation Error";
            break;
        default:
            statusMessage = "Internal Server Error";
            break;
    }
    res.json({
        statusMessage,
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
};
exports.default = errorHandler;
