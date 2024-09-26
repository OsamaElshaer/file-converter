const express = require("express");
const app = express();
const passport = require("../middlewares/0auth"); 
const router = require("../api/index");
const errorHandler = require("../middlewares/errorHandler");

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api", router);

// Error handling
app.use(errorHandler);

module.exports = app;
