const express = require("express");
const passport = require("../../middlewares/OAuth");

const router = express.Router();

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    (req, res, next) => {
        try {
            if (!req.user || !req.user.token) {
                return res
                    .status(401)
                    .json({ message: "Authentication failed" });
            }
            res.json({
                message: "Authentication successful",
                token: req.user.token,
                expiresIn: req.user.expiresIn || 3600, 
            });
        } catch (error) {
            next(error);
        }
    }
);
module.exports.users = router;
