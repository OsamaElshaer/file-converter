const express = require("express");
const app = express();

const errorHandler = require("../middlewares/errorHandler");

app.use(errorHandler);

module.exports = app;
