import contactsService from "../services/contactsServices.js";
import HttpError, { HTTP_STATUS_CODES } from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactsService.listContacts();
        res.status(HTTP_STATUS_CODES.SUCCESS).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const contact = await contactsService.getContactById(req.params.id);
        if (!contact) {
            return next(HttpError(HTTP_STATUS_CODES.NOT_FOUND));
        }
        res.status(HTTP_STATUS_CODES.SUCCESS).json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const contact = await contactsService.removeContact(req.params.id);
        if (!contact) {
            return next(HttpError(HTTP_STATUS_CODES.NOT_FOUND));
        }
        res.status(HTTP_STATUS_CODES.SUCCESS).json(contact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const newContact = await contactsService.addContact(name, email, phone);
        res.status(HTTP_STATUS_CODES.CREATED).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const updatedContact = await contactsService.updateContact(req.params.id, req.body);
        if (!updatedContact) {
            return next(HttpError(HTTP_STATUS_CODES.NOT_FOUND));
        }
        res.status(HTTP_STATUS_CODES.SUCCESS).json(updatedContact);
    } catch (error) {
        next(error);
    }
};

export const updateStatusContact = async (req, res, next) => {
    try {
        const updatedContact = await contactsService.updateContact(req.params.id, req.body);
        if (!updatedContact) {
            return next(HttpError(HTTP_STATUS_CODES.NOT_FOUND));
        }
        res.status(HTTP_STATUS_CODES.SUCCESS).json(updatedContact);
    } catch (error) {
        next(error);
    }
};