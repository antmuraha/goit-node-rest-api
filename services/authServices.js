import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/hashPassword.js";
import { jwtConfig } from "../config/jwtConfig.js";

const User = db.User;

export const register = async (email, password, subscription = "starter") => {
    try {
        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            subscription,
        });

        // Return user without password
        return {
            id: newUser.id,
            email: newUser.email,
            subscription: newUser.subscription,
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

export default {
    register,
    login,
    logout,
    findUserByToken,
};
