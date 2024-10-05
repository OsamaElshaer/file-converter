const express = require("express");
const app = express();

const passport = require("../middlewares/oAuth");
const router = require("../api/index");
const errorHandler = require("../middlewares/errorHandler");


app.use(express.json());

app.use("/api", router);
app.use(passport.initialize());

app.use(errorHandler);
app.use((req, res, next) => {
    res.json({
        msg: "page not found",
    });
});
module.exports = app;
