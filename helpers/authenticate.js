import HttpError, { HTTP_STATUS_CODES } from "./HttpError.js";
import authService from "../services/authServices.js";

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(HttpError(HTTP_STATUS_CODES.UNAUTHORIZED, "Not authorized"));
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        return next(HttpError(HTTP_STATUS_CODES.UNAUTHORIZED, "Not authorized"));
    }

    const user = await authService.findUserByToken(token);

    if (!user) {
        return next(HttpError(HTTP_STATUS_CODES.UNAUTHORIZED, "Not authorized"));
    }

    req.user = user;
    next();
};

export default authenticate;
