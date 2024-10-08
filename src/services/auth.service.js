const passport = require("../middlewares/oAuth");
const dbConnection = require("../start/database");
let getDb = dbConnection.getDatabase;

const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});

const googleCallback = (req, res, next) => {
    passport.authenticate("google", async (err, profile) => {
        try {
            let user = profile.user;
            if (err || !user || !profile.token) {
                return res
                    .status(401)
                    .json({ message: "Authentication failed" });
            }
            const existingUser = await getDb()
                .collection("users")
                .findOne({ sub: user.googleId });
            if (!existingUser) {
                const newUser = {
                    googleId: user.sub,
                    email: user.email,
                    name: user.name,
                    token: profile.token,
                    createdAt: new Date(),
                };
                await getDb().collection("users").insertOne(newUser);
            } else {
                await getDb()
                    .collection("users")
                    .updateOne(
                        { googleId: user.sub },
                        {
                            $set: {
                                token: profile.token,
                                lastLogin: new Date(),
                            },
                        }
                    );
            }
            res.json({
                message: "Authentication successful",
                token: profile.token,
                expiresIn: profile.expiresIn || 3600,
            });
        } catch (error) {
            next(error);
        }
    })(req, res, next);
};

module.exports = { googleAuth, googleCallback };
