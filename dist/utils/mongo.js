"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = require("mongoose");
require("dotenv/config");
const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.zwbiy.mongodb.net/switch?retryWrites=true&w=majority`;
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
const disconnect = async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('DB disconnected!');
    }
    catch (error) {
        console.log(error);
    }
};
exports.disconnect = disconnect;
