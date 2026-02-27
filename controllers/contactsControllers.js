import contactsService from "../services/contactsServices.js";
import HttpError, { HTTP_STATUS_CODES } from "../helpers/HttpError.js";
import validatePaginationParams from "../helpers/validatePaginationParams.js";

export const getAllContacts = async (req, res) => {
    const { page, limit } = validatePaginationParams(req.query);
    
    const result = await contactsService.listContacts(req.user.id, { page, limit });
    res.status(HTTP_STATUS_CODES.SUCCESS).json(result);
};

export const getOneContact = async (req, res, next) => {
    const contact = await contactsService.getContactById(req.user.id, { id: req.params.id });
    if (!contact) {
        return next(HttpError(HTTP_STATUS_CODES.NOT_FOUND));
    }
    res.status(HTTP_STATUS_CODES.SUCCESS).json(contact);
};

export const deleteContact = async (req, res, next) => {
    const contact = await contactsService.removeContact(req.user.id, { id: req.params.id });
    if (!contact) {
        return next(HttpError(HTTP_STATUS_CODES.NOT_FOUND));
    }
    res.status(HTTP_STATUS_CODES.SUCCESS).json(contact);
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = await contactsService.addContact(req.user.id, { name, email, phone });
    res.status(HTTP_STATUS_CODES.CREATED).json(newContact);
};

export const updateContact = async (req, res, next) => {
    const updatedContact = await contactsService.updateContact(req.user.id, { id: req.params.id, ...req.body });
    if (!updatedContact) {
        return next(HttpError(HTTP_STATUS_CODES.NOT_FOUND));
    }
    res.status(HTTP_STATUS_CODES.SUCCESS).json(updatedContact);
};

export const updateStatusContact = async (req, res, next) => {
    const updatedContact = await contactsService.updateContact(req.user.id, { id: req.params.id, ...req.body });
    if (!updatedContact) {
        return next(HttpError(HTTP_STATUS_CODES.NOT_FOUND));
    }
    res.status(HTTP_STATUS_CODES.SUCCESS).json(updatedContact);
};
