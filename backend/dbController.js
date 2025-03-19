const { MongoClient , ObjectId} = require('mongodb');
require('dotenv').config();
const mongoClient = new MongoClient(process.env.MONGO_URI);

async function insertCity(data){
    try {
        await mongoClient.connect();
        const db = mongoClient.db(process.env.DBWEATHER);
        const collection = db.collection(process.env.COLLECTIONCITY);
        return await collection.insertOne(data);
    } finally{
       await mongoClient.close(); 
    }
}

async function deleteCity(_id) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(process.env.DBWEATHER);
        const collection = db.collection(process.env.COLLECTIONCITY);
        return await collection.deleteOne({"_id": new ObjectId(_id)})
    } finally {
        await mongoClient.close();
    }
    
}

module.exports = {
insertCity,
deleteCity
};