const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
let dbConnection;

async function funConnectToDatabase() {
    if (!dbConnection) {
        await client.connect();
        dbConnection = client.db(process.env.DBWEATHER);
    }
    return dbConnection;
}

async function insertCity(data){
    const db = await funConnectToDatabase();
    const collection = db.collection(process.env.COLLECTIONCITY);
    return await collection.insertOne(data);
}

async function deleteCity(_id) {
    const db = await funConnectToDatabase();
    const collection = db.collection(process.env.COLLECTIONCITY);
    return await collection.deleteOne({"_id": new ObjectId(_id)});
}

module.exports = {
    insertCity,
    deleteCity
};
