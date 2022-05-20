"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItems = exports.updateItem = exports.findBucketList = exports.findMyBucket = void 0;
const title_model_1 = require("../models/title.model");
const bucket_model_1 = require("../models/bucket.model");
async function findMyBucket(id) {
    return await bucket_model_1.Bucket.findOne({ id });
}
exports.findMyBucket = findMyBucket;
async function findBucketList(bucket) {
    return await title_model_1.Game.find({ name: { $in: bucket?.list || [] } });
}
exports.findBucketList = findBucketList;
async function updateItem(id, titleName) {
    return await bucket_model_1.Bucket.updateOne({ id }, { $pull: { list: titleName } });
}
exports.updateItem = updateItem;
async function updateItems(id) {
    return await bucket_model_1.Bucket.updateOne({ id }, { $set: { list: [] } });
}
exports.updateItems = updateItems;
