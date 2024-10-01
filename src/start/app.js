const express = require("express");
const app = express();
const multer = require("multer");

const passport = require("../middlewares/oAuth");
const router = require("../api/index");
const errorHandler = require("../middlewares/errorHandler");


const upload = multer({ dest: "uploads/" });

// Middleware
app.use(express.json());

// Routes
app.use("/api", router);
app.use(passport.initialize());

// Error handling
app.use(errorHandler);

module.exports = app;
