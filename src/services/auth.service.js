const passport = require("../middlewares/oAuth");

const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});

const googleCallback = (req, res, next) => {
    passport.authenticate(
        "google",
        { session: false, failureRedirect: "/" },
        (err, user) => {
            try {
                if (err || !user || !user.token) {
                    return res
                        .status(401)
                        .json({ message: "Authentication failed" });
                }
                res.json({
                    message: "Authentication successful",
                    token: user.token,
                    expiresIn: user.expiresIn || 3600,
                });
            } catch (error) {
                next(error);
            }
        }
    )(req, res, next);
};

module.exports = { googleAuth, googleCallback };
