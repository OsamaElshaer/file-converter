const express = require("express");
const passport = require("passport");

const router = express.Router();

// Redirect to Google for authentication
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // On success, redirect or respond with a token
        res.redirect("/dashboard");
    }
);

module.exports.users = router;
