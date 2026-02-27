export const HTTP_STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

const messageList = {
    [HTTP_STATUS_CODES.BAD_REQUEST]: "Bad Request",
    [HTTP_STATUS_CODES.UNAUTHORIZED]: "Unauthorized",
    [HTTP_STATUS_CODES.FORBIDDEN]: "Forbidden",
    [HTTP_STATUS_CODES.NOT_FOUND]: "Not Found",
    [HTTP_STATUS_CODES.CONFLICT]: "Conflict",
    [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: "Internal Server Error",
};

const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export default HttpError;
