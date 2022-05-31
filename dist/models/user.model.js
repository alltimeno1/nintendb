"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    provider: { type: String, required: true },
    profileImage: String,
}, {
    versionKey: false,
});
exports.User = (0, mongoose_1.model)('user', schema);
