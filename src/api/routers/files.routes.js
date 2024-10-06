const express = require("express");
const router = express.Router();

const fileService = require("../../services/files.service");

router.post("/upload", fileService.upload);
router.get("/status/:jobId", fileService.status);
router.get("/download/:fileId", fileService.download);

module.exports.uploads = router;
