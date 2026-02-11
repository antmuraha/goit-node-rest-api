import express from "express";
import * as controllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controllers.getAllContacts);

contactsRouter.get("/:id", controllers.getOneContact);

contactsRouter.delete("/:id", controllers.deleteContact);

contactsRouter.post("/", validateBody(schemas.createContactSchema), controllers.createContact);

contactsRouter.put("/:id", validateBody(schemas.updateContactSchema), controllers.updateContact);

contactsRouter.patch("/:id", validateBody(schemas.partialUpdateContactSchema), controllers.updateContact);

contactsRouter.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), controllers.updateStatusContact);

export default contactsRouter;
