const { users } = require("./routers/auth.routes");
const { uploads } = require("./routers/files.routes");
const router = require("express").Router();

router.use("/users", users);
router.use("/files", uploads);


module.exports = router;
