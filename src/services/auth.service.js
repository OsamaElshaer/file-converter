const passport = require("../middlewares/oAuth");
const dbConnection = require("../start/database");
const db = dbConnection.getDatabase();

const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});

const googleCallback = (req, res, next) => {
    passport.authenticate("google", async (err, user) => {
        try {
            if (err || !user || !user.token) {
                return res
                    .status(401)
                    .json({ message: "Authentication failed" });
            }

            const existingUser = await db
                .collection("users")
                .findOne({ googleId: user.googleId });

            if (!existingUser) {
                const newUser = {
                    googleId: user.googleId,
                    email: user.email,
                    name: user.name,
                    token: user.token,
                    createdAt: new Date(),
                    jobs: []
                };
                await db.collection("users").insertOne(newUser);
            } else {
                await db.collection("users").updateOne(
                    { googleId: user.googleId },
                    {
                        $set: {
                            token: user.token,
                            lastLogin: new Date(),
                        },
                    }
                );
            }
            res.json({
                message: "Authentication successful",
                token: user.token,
                expiresIn: user.expiresIn || 3600,
            });
        } catch (error) {
            next(error);
        }
    })(req, res, next);
};

module.exports = { googleAuth, googleCallback };
