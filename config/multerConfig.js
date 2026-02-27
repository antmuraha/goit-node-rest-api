import multer from "multer";
import path from "path";

const TEMP_DIR = "temp/";
const FILE_SIZE_LIMIT = 1 * 1024 * 1024; // 1 MB

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_DIR);
    },
    filename: (req, file, cb) => {
        // Generate filename with timestamp: userid_timestamp.ext
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only jpg, png, and gif files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: FILE_SIZE_LIMIT,
    },
});

export default upload;
