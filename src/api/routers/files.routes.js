const express = require("express");
const router = express.Router();
const { upload, status, download } = require("../../services/files.service");

router.post("/upload", upload);
router.get("/status/:jobId", status);
router.get("/download/:fileId", download);

module.exports.uploads = router;
