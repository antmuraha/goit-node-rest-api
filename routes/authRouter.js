import express from "express";
import * as controllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/authSchemas.js";
import authenticate from "../helpers/authenticate.js";
import upload from "../config/multerConfig.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(schemas.registerSchema), controllers.register);

authRouter.post("/login", validateBody(schemas.loginSchema), controllers.login);

authRouter.post("/logout", authenticate, controllers.logout);

authRouter.get("/current", authenticate, controllers.getCurrentUser);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), controllers.updateAvatar);

export default authRouter;
