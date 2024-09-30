const dotenv = require("dotenv");
dotenv.config();

const {
    PORT,
    DB_HOST,
    JWT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
} = process.env;

module.exports = {
    port: PORT,
    dbHost: DB_HOST,
    jwtSecretKey: JWT_SECRET,
    googleClientId: GOOGLE_CLIENT_ID,
    googleClientSecret: GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: GOOGLE_CALLBACK_URL,
};
