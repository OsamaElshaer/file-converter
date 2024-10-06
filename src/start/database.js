const { MongoClient } = require("mongodb");
const { dbHost, dbName } = require("../config/env");

class DBInterface {
    connect() {
        throw new Error("You must override this function");
    }
    disconnect() {
        throw new Error("You must override this function");
    }
}

class MongoDBConnection extends DBInterface {
    constructor(connectionString) {
        super();
        this.connectionString = connectionString;
        this.client = new MongoClient(this.connectionString);
        this.db = null;
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("MongoDB connected...");
            this.db = this.client.db(dbName);
        } catch (err) {
            throw new Error(`Error connecting to MongoDB: ${err.message}`);
        }
    }

    async disconnect() {
        try {
            await this.client.close();
            console.log("MongoDB disconnected...");
        } catch (err) {
            throw new Error(`Error disconnecting from MongoDB: ${err.message}`);
        }
    }

    getDatabase() {
        return this.db;
    }
}

class DBConnection {
    constructor(dbInstance) {
        if (DBConnection.instance) {
            return DBConnection.instance;
        }
        this.dbInstance = dbInstance;
    }

    async connect() {
        await this.dbInstance.connect();
    }

    async disconnect() {
        await this.dbInstance.disconnect();
    }

    getDatabase = () => {
        return this.dbInstance.getDatabase();
    };
}

const mongoDBConnection = new MongoDBConnection(dbHost);
const dbConnection = new DBConnection(mongoDBConnection);

module.exports = dbConnection;
