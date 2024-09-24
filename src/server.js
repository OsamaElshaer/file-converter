const app = require("./start/app");

const { port } = require("./config/env");

app.listen(port, () => {
    console.log(`server running port ${port}`);
});
