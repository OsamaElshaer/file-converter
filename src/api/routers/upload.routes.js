const express = require("express");
const router = express.Router();
const { uploadFile } = require("../../services/upload.service");

router.post("/", uploadFile);

module.exports.uploads = router;
