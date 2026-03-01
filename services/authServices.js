import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/hashPassword.js";
import { jwtConfig } from "../config/jwtConfig.js";
import { downloadGravatarToLocal } from "./avatarServices.js";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail.js";
import HttpError from "../helpers/HttpError.js";

const User = db.User;

export const register = async (email, password, subscription = "starter") => {
    try {
        const hashedPassword = await hashPassword(password);
        const uuidv4 = await import("uuid").then((module) => module.v4);
        const verificationToken = uuidv4();

        const newUser = await User.create({
            email,
            password: hashedPassword,
            subscription,
            avatarURL: null,
            verify: false,
            verificationToken,
        });

        const avatarURL = await downloadGravatarToLocal(email, newUser.id);
        if (avatarURL) {
            await newUser.update({ avatarURL });
        }

        // Send verification email
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (error) {
            console.error("Error sending verification email:", error);
            // Continue even if email sending fails - user can resend later
        }

        return {
            id: newUser.id,
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
            verify: newUser.verify,
        };
    } catch (error) {
        // Check for unique constraint violation
        if (error.name === "SequelizeUniqueConstraintError") {
            return null;
        }
        console.error("Error registering user:", error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) return null;

        // Check if user email is verified
        if (!user.verify) {
            throw HttpError(403, "Please verify your email first");
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return null;

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
        });

        // Save token to user
        await user.update({ token });

        // Return token and user data
        return {
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
                avatarURL: user.avatarURL,
            },
        };
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

export const logout = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) return null;

        // Clear token
        await user.update({ token: null });
        return user;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
};

export const findUserByToken = async (token) => {
    try {
        // Verify and decode token
        const decoded = jwt.verify(token, jwtConfig.secret);

        // Find user with matching id and token
        const user = await User.findOne({
            where: {
                id: decoded.id,
                token,
            },
        });

        return user || null;
    } catch (error) {
        // Token verification failed or expired
        return null;
    }
};

export const updateUserAvatar = async (userId, avatarURL) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) return null;

        await user.update({ avatarURL });
        return {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
        };
    } catch (error) {
        console.error("Error updating user avatar:", error);
        throw error;
    }
};

export const verifyEmail = async (verificationToken) => {
    try {
        // Find user by verification token
        const user = await User.findOne({ where: { verificationToken } });
        if (!user) {
            return null;
        }

        // Check if already verified
        if (user.verify) {
            return null;
        }

        // Mark email as verified and clear token
        await user.update({ verify: true, verificationToken: null });

        return {
            email: user.email,
            verify: user.verify,
        };
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
};

export const resendVerificationEmail = async (email) => {
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return null;
        }

        // Check if already verified
        if (user.verify) {
            throw HttpError(400, "Verification has already been passed");
        }

        // Generate new verification token
        const uuidv4 = await import("uuid").then((module) => module.v4);
        const verificationToken = uuidv4();
        await user.update({ verificationToken });

        // Send verification email
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw error;
        }

        return {
            email: user.email,
            verify: user.verify,
        };
    } catch (error) {
        console.error("Error resending verification email:", error);
        throw error;
    }
};

export default {
    register,
    login,
    logout,
    findUserByToken,
    updateUserAvatar,
    verifyEmail,
    resendVerificationEmail,
};
