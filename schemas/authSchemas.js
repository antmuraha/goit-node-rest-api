import Joi from "joi";

const email = Joi.string().email().required();
const password = Joi.string().min(6).required();
const subscription = Joi.string().valid("starter", "pro", "business");

export const registerSchema = Joi.object({
    email,
    password,
});

export const loginSchema = Joi.object({
    email,
    password,
});

export const verificationEmailSchema = Joi.object({
    email,
});

export default {
    registerSchema,
    loginSchema,
    verificationEmailSchema,
    subscription,
};
