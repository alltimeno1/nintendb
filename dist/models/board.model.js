"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    nickname: { type: String, required: true },
    password: String,
    user_id: String,
    text: { type: String, required: true },
    date: { type: Date, required: true },
    viewCount: { type: Number, required: true },
    recommend: { type: [String], required: true },
}, {
    versionKey: false,
});
exports.Board = (0, mongoose_1.model)('board', schema);
