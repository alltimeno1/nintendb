"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.connectCollection = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
require("dotenv/config");
const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.zwbiy.mongodb.net/switch?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(uri);
async function connectCollection(colName) {
    const _client = await client.connect();
    return _client.db('switch').collection(colName);
}
exports.connectCollection = connectCollection;
const connect = async () => {
    try {
        await mongoose_1.default.connect(uri, { ignoreUndefined: true });
        console.log('DB connected!');
    }
    catch (error) {
        console.log(error);
    }
};
exports.connect = connect;
