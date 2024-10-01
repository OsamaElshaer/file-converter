const { users } = require("./routers/auth.routes");
const { uploads } = require("./routers/upload.routes");
const router = require("express").Router();

router.use("/users", users);
router.use("/uploads", uploads);


module.exports = router;
