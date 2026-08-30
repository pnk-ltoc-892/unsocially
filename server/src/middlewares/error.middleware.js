import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof ApiError
        ? err.statusCode
        : err.statusCode || err.status || 500;
    const message = err instanceof ApiError || (statusCode < 500 && err.message)
        ? err.message
        : "Internal Server Error";

    if (statusCode >= 500) {
        console.error("Unhandled error:", err);
    }

    return res.status(statusCode).json(new ApiResponse(statusCode, null, message));
};
