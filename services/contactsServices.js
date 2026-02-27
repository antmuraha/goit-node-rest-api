import db from "../models/index.js";

const Contact = db.Contact;

export const listContacts = async (owner, options = {}) => {
    try {
        const page = options.page || 1;
        const limit = options.limit || 20;
        const offset = (page - 1) * limit;
        
        const where = { owner };
        if (options.favorite !== undefined) {
            where.favorite = options.favorite === 'true';
        }
        
        const { rows } = await Contact.findAndCountAll({
            where,
            limit,
            offset,
            order: [["id", "DESC"]],
        });
        
        return {
            data: rows,
            page,
            limit,
        };
    } catch (error) {
        console.error("Error reading contacts:", error);
        throw error;
    }
};

export const getContactById = async (owner, { id }) => {
    try {
        const contact = await Contact.findOne({ where: { id, owner } });
        return contact || null;
    } catch (error) {
        console.error("Error getting contact by ID:", error);
        throw error;
    }
};

export const addContact = async (owner, { name, email, phone }) => {
    try {
        const newContact = await Contact.create({
            name,
            email,
            phone,
            owner,
        });
        return newContact;
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
};

export const removeContact = async (owner, { id }) => {
    try {
        const contact = await Contact.findOne({ where: { id, owner } });
        if (!contact) return null;
        await contact.destroy();
        return contact;
    } catch (error) {
        console.error("Error removing contact:", error);
        throw error;
    }
};

export const updateContact = async (owner, { id, ...body }) => {
    try {
        const contact = await Contact.findOne({ where: { id, owner } });
        if (!contact) return null;
        await contact.update(body);
        return contact;
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error;
    }
};

export default {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
};
