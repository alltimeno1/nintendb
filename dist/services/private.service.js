"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItems = exports.updateItem = exports.findBucketList = exports.findMyBucket = void 0;
const title_model_1 = require("../models/title.model");
const bucket_model_1 = require("../models/bucket.model");
async function findMyBucket(id) {
    const bucket = await bucket_model_1.Bucket.findOne({ id });
    return bucket;
}
exports.findMyBucket = findMyBucket;
async function findBucketList(bucket) {
    const games = await title_model_1.Game.find({ name: { $in: bucket?.list || [] } }, { image: 1, name: 1, price: 1, rating: 1 });
    return games;
}
exports.findBucketList = findBucketList;
async function updateItem(id, titleName) {
    await bucket_model_1.Bucket.updateOne({ id }, { $pull: { list: titleName } });
}
exports.updateItem = updateItem;
async function deleteItems(id) {
    await bucket_model_1.Bucket.deleteOne({ id });
}
exports.deleteItems = deleteItems;
