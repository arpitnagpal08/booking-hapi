const models = require("../models");

const mongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017";

const dbName = "expressdb";

function initDb(){
    mongoClient.connect(url, (err, client) => {
        
        if(err) throw err;

        console.log("Connected to database");

        const databaseName = client.db(dbName);
        global.dataBase = databaseName;
        models.log();
    });
}

module.exports = initDb;