const express = require("express");
const app = express();
const passport = require("../middlewares/Oauth");
const router = require("../api/index");
const errorHandler = require("../middlewares/errorHandler");

// Middleware
app.use(express.json());

// Routes
app.use("/api", router);
app.use(passport.initialize());

// Error handling
app.use(errorHandler);

module.exports = app;
