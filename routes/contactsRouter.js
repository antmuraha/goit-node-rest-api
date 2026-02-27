import express from "express";
import * as controllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/contactsSchemas.js";
import authenticate from "../helpers/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, controllers.getAllContacts);

contactsRouter.get("/:id", authenticate, controllers.getOneContact);

contactsRouter.delete("/:id", authenticate, controllers.deleteContact);

contactsRouter.post("/", authenticate, validateBody(schemas.createContactSchema), controllers.createContact);

contactsRouter.put("/:id", authenticate, validateBody(schemas.updateContactSchema), controllers.updateContact);

contactsRouter.patch("/:id", authenticate, validateBody(schemas.partialUpdateContactSchema), controllers.updateContact);

contactsRouter.patch("/:id/favorite", authenticate, validateBody(schemas.updateFavoriteSchema), controllers.updateStatusContact);

export default contactsRouter;
