"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInquery = exports.findSortedList = void 0;
const inquery_model_1 = require("../models/inquery.model");
const title_model_1 = require("../models/title.model");
async function findSortedList() {
    const best = await title_model_1.Game.find().sort({ rating: -1 }).limit(4);
    const recent = await title_model_1.Game.find().sort({ date: -1 }).limit(4);
    const sale = await title_model_1.Game.find().sort({ discountRate: -1 }).limit(4);
    return [best, recent, sale];
}
exports.findSortedList = findSortedList;
async function insertInquery(name, email, message) {
    await inquery_model_1.Inquery.create({
        name,
        email,
        message,
    });
}
exports.insertInquery = insertInquery;
