const app = require("./start/app");
const dbConnection = require("./start/database");
const { port } = require("./config/env");
const { logger } = require("./utils/logger");

async function startServer() {
    try {
        await dbConnection.connect(); // Wait for DB connection
        const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        process.on("unhandledRejection", (err) => {
            console.log(err);
            logger.error("Unhandled Promise Rejection:", err.message);
            server.close((error) => {
                if (error) {
                    logger.error(
                        "Error occurred while closing the server:",
                        error.message
                    );
                    process.exit(1);
                }
                logger.error("Server gracefully shut down");
                process.exit(1);
            });
        });

        process.on("uncaughtException", (err) => {
            console.log(err);
            logger.error("Uncaught Exception:", err.message);
            server.close(() => {
                logger.error(
                    "Server shut down due to uncaught exception",
                    err.message
                );
                process.exit(1);
            });
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    }
}

startServer();
