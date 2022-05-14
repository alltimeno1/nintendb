"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.getSortedList = void 0;
const mongo_1 = require("../utils/mongo");
async function getSortedList() {
    const games = await (0, mongo_1.connectCollection)('games');
    const best = await games.find().sort({ rating: -1 }).limit(4).toArray();
    const recent = await games.find().sort({ date: -1 }).limit(4).toArray();
    const sale = await games.find().sort({ discountRate: -1 }).limit(4).toArray();
    return [best, recent, sale];
}
exports.getSortedList = getSortedList;
async function sendEmail(name, email, message) {
    const inquery = await (0, mongo_1.connectCollection)('inquery');
    await inquery.insertOne({
        name,
        email,
        message,
    });
}
exports.sendEmail = sendEmail;
