const dotenv = require("dotenv");
dotenv.config();

const { PORT, DB_HOST, JWT_SECRET_KEY } = process.env;

module.exports = {
    port: PORT,
    dbHost: DB_HOST,
    jwtSecretKey: JWT_SECRET_KEY,
};
