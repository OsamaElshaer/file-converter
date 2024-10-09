const dbConnection = require("../start/database");
const { ObjectId } = require("mongodb");
let getDb = dbConnection.getDatabase;

class JobModel {
    add(obj) {
        const db = getDb();
        const result = db.collection("jobs").insertOne(obj);
        return result;
    }
    find(key, value) {
        const query = { [key]: parseInt(value) };
        const result = getDb().collection("jobs").findOne(query);

        return result;
    }
    findAll(id) {
        const cursor = getDb().collection("jobs").find({ userId: id });
        return cursor.toArray();
    }

    async update(id, obj) {
        const db = getDb();
        const result = db
            .collection("jobs")
            .updateOne({ jobId: id }, { $set: obj });
        return result;
    }
    async remove(id) {
        const db = await getDb();
        const result = await db
            .collection("jobs")
            .deleteOne({ _id: new ObjectId(id) });
        return result;
    }
}

module.exports = new JobModel();
