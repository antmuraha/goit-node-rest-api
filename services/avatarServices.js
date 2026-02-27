import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { AVATARS_TEMP_DIR } from "../config/multerConfig.js";

const TEMP_DIR = path.resolve(AVATARS_TEMP_DIR);
const AVATARS_DIR = path.resolve("public", "avatars");

const getExtFromContentType = (contentType) => {
    if (contentType === "image/png") return ".png";
    if (contentType === "image/gif") return ".gif";
    if (contentType === "image/webp") return ".webp";
    return ".jpg";
};

const createGravatarUrl = (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    const emailHash = createHash("md5").update(normalizedEmail).digest("hex");
    const params = new URLSearchParams({ s: "250", d: "identicon" });

    return `https://www.gravatar.com/avatar/${emailHash}?${params.toString()}`;
};

export const downloadGravatarToLocal = async (email, userId) => {
    try {
        const gravatarUrl = createGravatarUrl(email);
        const response = await fetch(gravatarUrl);

        if (!response.ok) {
            throw new Error(`Failed to download gravatar: ${response.status}`);
        }

        const contentType = response.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
        const ext = getExtFromContentType(contentType);
        const filename = `${userId}_${Date.now()}${ext}`;
        const absoluteFilePath = path.join(TEMP_DIR, filename);
        const buffer = Buffer.from(await response.arrayBuffer());

        // Write file to temp directory first, then move to public/avatars
        await fs.writeFile(absoluteFilePath, buffer);

        // Move file from temp to public/avatars
        await fs.rename(absoluteFilePath, path.join(AVATARS_DIR, filename));

        return `/avatars/${filename}`;
    } catch (error) {
        console.error("Error creating gravatar:", error);
        return null;
    }
};
