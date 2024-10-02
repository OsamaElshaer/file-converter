const express = require("express");
const router = express.Router();
const { upload, status } = require("../../services/files.service");

router.post("/upload", upload);
router.get("/status/:jobId", status);

module.exports.uploads = router;
