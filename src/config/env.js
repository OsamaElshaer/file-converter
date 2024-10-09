const dotenv = require("dotenv");
dotenv.config();

const {
    PORT,
    DB_HOST,
    DB_NAME,
    JWT_SECRET_key,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
} = process.env;

module.exports = {
    port: PORT,
    dbHost: DB_HOST,
    dbName: DB_NAME,
    jwtSecretKey: JWT_SECRET_key,
    googleClientId: GOOGLE_CLIENT_ID,
    googleClientSecret: GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: GOOGLE_CALLBACK_URL,
};
