import Joi from "joi";

const name = Joi.string().max(100);
const email = Joi.string().email();
const phone = Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .message("Phone number must be in the format (XXX) XXX-XXXX");

export const createContactSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    phone: phone.required(),
});

export const partialUpdateContactSchema = Joi.object({
    name,
    email,
    phone,
}).or("name", "email", "phone");

export const updateContactSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    phone: phone.required(),
});

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

export default {
    createContactSchema,
    updateContactSchema,
    partialUpdateContactSchema,
};
