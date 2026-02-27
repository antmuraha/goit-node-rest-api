import express from "express";
import * as controllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/authSchemas.js";
import authenticate from "../helpers/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(schemas.registerSchema), controllers.register);

authRouter.post("/login", validateBody(schemas.loginSchema), controllers.login);

authRouter.post("/logout", authenticate, controllers.logout);

authRouter.get("/current", authenticate, controllers.getCurrentUser);

export default authRouter;
