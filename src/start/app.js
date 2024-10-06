const express = require("express");
const app = express();

const passport = require("../middlewares/oAuth");
const router = require("../api/index");
const errorHandler = require("../middlewares/errorHandler");
const { notFound404 } = require("../middlewares/notFound404");

app.use(express.json());

app.use("/api", router);
app.use(passport.initialize());

app.all("*", notFound404);

app.use(errorHandler);

module.exports = app;
