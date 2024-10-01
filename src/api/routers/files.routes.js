const express = require("express");
const router = express.Router();
const { upload, convert } = require("../../services/files.service");

router.post("/upload", upload);
router.post("/convert", convert);

module.exports.uploads = router;
