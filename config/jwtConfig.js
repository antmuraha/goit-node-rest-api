// JWT configuration

export const jwtConfig = {
    secret: process.env.JWT_SECRET || "fallback-secret-for-development",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
};

export default jwtConfig;
