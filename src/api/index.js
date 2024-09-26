const { users } = require("./routers/auth.routes");
const router = require("express").Router();

router.use("/users", users);

module.exports = router;
