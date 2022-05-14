"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInquery = exports.findSortedList = void 0;
const mongo_1 = require("../utils/mongo");
async function findSortedList() {
    const games = await (0, mongo_1.connectCollection)('games');
    const best = await games.find().sort({ rating: -1 }).limit(4).toArray();
    const recent = await games.find().sort({ date: -1 }).limit(4).toArray();
    const sale = await games.find().sort({ discountRate: -1 }).limit(4).toArray();
    return [best, recent, sale];
}
exports.findSortedList = findSortedList;
async function insertInquery(name, email, message) {
    const inquery = await (0, mongo_1.connectCollection)('inquery');
    await inquery.insertOne({
        name,
        email,
        message,
    });
}
exports.insertInquery = insertInquery;
