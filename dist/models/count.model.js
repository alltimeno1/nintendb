"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Count = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    count: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
}, {
    versionKey: false,
});
exports.Count = (0, mongoose_1.model)('count', schema);
