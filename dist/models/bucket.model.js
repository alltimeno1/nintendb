"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bucket = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: { type: String, required: true },
    list: [String],
}, {
    versionKey: false,
});
exports.Bucket = (0, mongoose_1.model)('bucket', schema);
