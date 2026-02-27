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
            avatarURL: newUser.avatarURL,
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
        avatarURL: req.user.avatarURL,
    });
};

export const updateAvatar = async (req, res, next) => {
    if (!req.file) {
        return next(HttpError(HTTP_STATUS_CODES.BAD_REQUEST, "No file uploaded"));
    }

    const { path: tempPath, filename: tempFilename } = req.file;
    const userId = req.user.id;
    const ext = tempFilename.substring(tempFilename.lastIndexOf("."));
    const newFilename = `${userId}_${Date.now()}${ext}`;
    const publicPath = `public/avatars/${newFilename}`;

    try {
        // Move file from temp to public/avatars
        const fs = await import("fs").then((m) => m.promises);
        await fs.rename(tempPath, publicPath);

        // Update user avatar URL in database
        const avatarURL = `/avatars/${newFilename}`;
        const result = await authService.updateUserAvatar(userId, avatarURL);

        res.status(HTTP_STATUS_CODES.SUCCESS).json({
            avatarURL: result.avatarURL,
        });
    } catch (error) {
        console.error("Error updating avatar:", error);
        next(HttpError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to update avatar"));
    }
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
    updateAvatar,
};
