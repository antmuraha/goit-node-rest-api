import { createHash } from "node:crypto";

export const createGravatarUrl = (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    const emailHash = createHash("md5").update(normalizedEmail).digest("hex");
    const params = new URLSearchParams({ s: "250", d: "identicon" });

    return `https://www.gravatar.com/avatar/${emailHash}?${params.toString()}`;
};
