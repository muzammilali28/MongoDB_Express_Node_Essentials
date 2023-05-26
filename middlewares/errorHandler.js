const { ErrorCode } = require("../errorStatusCodes");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case ErrorCode.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            })
            break;

        case ErrorCode.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            })
            break;

        case ErrorCode.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            })
            break;

        case ErrorCode.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            })
            break;

        case ErrorCode.SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack,
            })
            break;

        default:
            console.log("No Error, All good!!");
            break;
    }
    
    next();
}

module.exports = errorHandler;