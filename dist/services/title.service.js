"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLogoutComment = exports.deleteLoginComment = exports.updateLogoutComment = exports.updateLoginComment = exports.updateWishItem = exports.findTitleDetails = exports.findByQuery = exports.findTitles = void 0;
const mongo_1 = require("../utils/mongo");
const mongodb_1 = require("mongodb");
async function findTitles(sort) {
    const games = await (0, mongo_1.connectCollection)('games');
    const title = await games
        .find()
        .sort({ [sort]: -1 })
        .toArray();
    const top10 = await games.find().sort({ rating: -1 }).limit(10).toArray();
    return [title, top10];
}
exports.findTitles = findTitles;
async function findByQuery(keyword) {
    const games = await (0, mongo_1.connectCollection)('games');
    const title = await games.find({ name: { $regex: keyword } }).toArray();
    const top10 = await games.find().sort({ rating: -1 }).limit(10).toArray();
    return [title, top10];
}
exports.findByQuery = findByQuery;
async function findTitleDetails(id) {
    const games = await (0, mongo_1.connectCollection)('games');
    const comments = await (0, mongo_1.connectCollection)('comments');
    const title = await games.findOne({ name: id });
    const comment = await comments.find({ game_id: id }).toArray();
    return [title, comment];
}
exports.findTitleDetails = findTitleDetails;
async function updateWishItem(id, gameId) {
    const buckets = await (0, mongo_1.connectCollection)('buckets');
    const bucket = await buckets.findOne({ id: id });
    if (bucket) {
        await buckets.updateOne({ id: id }, { $addToSet: { list: gameId } });
    }
    else {
        await buckets.insertOne({ id: id, list: [gameId] });
    }
}
exports.updateWishItem = updateWishItem;
async function updateLoginComment(gameId, userId, displayName, text) {
    const comments = await (0, mongo_1.connectCollection)('comments');
    await comments.insertOne({
        game_id: decodeURI(gameId),
        id: userId,
        name: displayName,
        text: text.replace(/\n/g, '<br>'),
    });
}
exports.updateLoginComment = updateLoginComment;
async function updateLogoutComment(gameId, userName, password, text) {
    const comments = await (0, mongo_1.connectCollection)('comments');
    await comments.insertOne({
        game_id: decodeURI(gameId),
        name: userName,
        password,
        text: text.replace(/\n/g, '<br>'),
    });
}
exports.updateLogoutComment = updateLogoutComment;
async function deleteLoginComment(userId, commentId) {
    const comments = await (0, mongo_1.connectCollection)('comments');
    await comments.deleteOne({
        _id: new mongodb_1.ObjectId(commentId),
        id: userId,
    });
}
exports.deleteLoginComment = deleteLoginComment;
async function deleteLogoutComment(commentId, password) {
    const comments = await (0, mongo_1.connectCollection)('comments');
    const result = await comments.findOneAndDelete({
        _id: new mongodb_1.ObjectId(commentId),
        password: password,
    });
    return result;
}
exports.deleteLogoutComment = deleteLogoutComment;
