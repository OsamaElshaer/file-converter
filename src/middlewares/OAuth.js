const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const {
    JWT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} = require("../config/env");

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // Here, typically, you would save user details in the database
            const payload = { id: profile.id, email: profile.emails[0].value };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
            return done(null, { token });
        }
    )
);

module.exports = passport;
