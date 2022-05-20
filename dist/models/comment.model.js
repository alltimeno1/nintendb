"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    game_id: { type: String, required: true },
    name: { type: String, required: true },
    password: String,
    id: String,
    text: { type: String, required: true },
}, {
    versionKey: false,
});
exports.Comment = (0, mongoose_1.model)('comment', schema);
