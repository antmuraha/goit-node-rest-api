import express from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./models/index.js";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

const PORT = process.env.APP_PORT || 3000;

db.sequelize
    .authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Database connection successful.`);
            console.log(`Server is running. Use our API on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1);
    });
