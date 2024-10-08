const { isAuth } = require("../middlewares/isAuth");
const { users } = require("./routers/auth.routes");
const { uploads } = require("./routers/files.routes");
const router = require("express").Router();

router.use("/users", users);
router.use("/files", isAuth, uploads);

module.exports = router;
