const dotenv = require("dotenv");
dotenv.config();

const { PORT, DB_HOST } = process.env;

module.exports = {
    port: PORT,
    dbHost: DB_HOST,
};
