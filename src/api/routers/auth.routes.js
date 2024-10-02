const express = require("express");
const router = express.Router();
const { googleAuth, googleCallback } = require("../../services/auth.service");


router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback);

module.exports.users = router;
