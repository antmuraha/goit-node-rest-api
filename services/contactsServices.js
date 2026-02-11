import db from "../models/index.js";

const Contact = db.Contact;

export const listContacts = async () => {
    try {
        const contacts = await Contact.findAll();
        return contacts;
    } catch (error) {
        console.error("Error reading contacts:", error);
        throw error;
    }
};

export const getContactById = async (contactId) => {
    try {
        const contact = await Contact.findByPk(contactId);
        return contact || null;
    } catch (error) {
        console.error("Error getting contact by ID:", error);
        throw error;
    }
};

export const addContact = async (name, email, phone) => {
    try {
        const newContact = await Contact.create({
            name,
            email,
            phone,
        });
        return newContact;
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
};

export const removeContact = async (contactId) => {
    try {
        const contact = await Contact.findByPk(contactId);
        if (!contact) return null;
        await contact.destroy();
        return contact;
    } catch (error) {
        console.error("Error removing contact:", error);
        throw error;
    }
};

export const updateContact = async (contactId, body) => {
    try {
        const contact = await Contact.findByPk(contactId);
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
