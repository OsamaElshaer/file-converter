const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const {
    jwtSecretKey,
    googleClientId,
    googleClientSecret,
    googleCallbackUrl,
} = require("../config/env");

passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientId,
            clientSecret: googleClientSecret,
            callbackURL: googleCallbackUrl,
        },
        (accessToken, refreshToken, profile, done) => {
            try {
                if (!profile.emails || profile.emails.length === 0) {
                    return done(
                        new Error(
                            "No email associated with this Google account."
                        )
                    );
                }

                const payload = {
                    id: profile.id,
                    email: profile.emails[0].value,
                };

                const token = jwt.sign(payload, jwtSecretKey, {
                    expiresIn: "1h",
                });
                return done(null, {
                    user: profile["_json"],
                    token,
                    expiresIn: 3600,
                });
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

module.exports = passport;
