import authService from "../services/authServices.js";
import HttpError, { HTTP_STATUS_CODES } from "../helpers/HttpError.js";

export const register = async (req, res, next) => {
    const { email, password } = req.body;

    const newUser = await authService.register(email, password);

    if (!newUser) {
        return next(HttpError(HTTP_STATUS_CODES.CONFLICT, "Email in use"));
    }

    res.status(HTTP_STATUS_CODES.CREATED).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    if (!result) {
        return next(HttpError(HTTP_STATUS_CODES.UNAUTHORIZED, "Email or password is wrong"));
    }

    res.status(HTTP_STATUS_CODES.SUCCESS).json({
        token: result.token,
        user: result.user,
    });
};

export const logout = async (req, res, next) => {
    const result = await authService.logout(req.user.id);

    if (!result) {
        return next(HttpError(HTTP_STATUS_CODES.UNAUTHORIZED, "Not authorized"));
    }

    res.status(204).send();
};

export const getCurrentUser = async (req, res) => {
    res.status(HTTP_STATUS_CODES.SUCCESS).json({
        email: req.user.email,
        subscription: req.user.subscription,
    });
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
