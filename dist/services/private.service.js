"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItems = exports.updateItem = exports.findBucketList = exports.findMyBucket = void 0;
const mongo_1 = require("../utils/mongo");
async function findMyBucket(id) {
    const buckets = await (0, mongo_1.connectCollection)('buckets');
    return await buckets.findOne({ id });
}
exports.findMyBucket = findMyBucket;
async function findBucketList(bucket) {
    const games = await (0, mongo_1.connectCollection)('games');
    return await games.find({ name: { $in: bucket?.list || [] } }).toArray();
}
exports.findBucketList = findBucketList;
async function updateItem(id, titleName) {
    const buckets = await (0, mongo_1.connectCollection)('buckets');
    return await buckets.updateOne({ id }, { $pull: { list: titleName } });
}
exports.updateItem = updateItem;
async function updateItems(id) {
    const buckets = await (0, mongo_1.connectCollection)('buckets');
    return await buckets.updateOne({ id }, { $set: { list: [] } });
}
exports.updateItems = updateItems;
