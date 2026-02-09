import fs from "fs/promises";
import path from "node:path";

const contactsPath = path.join(process.cwd(), "src", "db", "contacts.json");

export const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading contacts:", error);
        throw error;
    }
};

export const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        return contacts.find((contact) => contact.id == contactId) || null;
    } catch (error) {
        console.error("Error getting contact by ID:", error);
        throw error;
    }
};

export const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
};

export const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex((contact) => contact.id == contactId);
        if (index === -1) return null;
        const removedContact = contacts.splice(index, 1)[0];
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact;
    } catch (error) {
        console.error("Error removing contact:", error);
        throw error;
    }
};

export default {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};
