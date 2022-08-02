"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    bargainPrice: { type: Number, required: true },
    discountRate: { type: Number, required: true },
    tag: { type: String, required: true },
    description: { type: String, required: false },
}, {
    versionKey: false,
});
exports.Game = (0, mongoose_1.model)('game', schema);
