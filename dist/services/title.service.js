"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLogoutComment = exports.deleteLoginComment = exports.updateLogoutComment = exports.updateLoginComment = exports.updateWishItem = exports.findTitleDetails = exports.findByTags = exports.findByQuery = exports.findTitles = void 0;
const title_model_1 = require("../models/title.model");
const comment_model_1 = require("../models/comment.model");
const bucket_model_1 = require("../models/bucket.model");
const mongodb_1 = require("mongodb");
async function findTitles(sort) {
    const title = await title_model_1.Game.find().sort({ [sort]: -1 });
    const top10 = await title_model_1.Game.find().sort({ rating: -1 }).limit(10);
    return [title, top10];
}
exports.findTitles = findTitles;
async function findByQuery(keyword) {
    const title = await title_model_1.Game.find({ name: { $regex: keyword } });
    const top10 = await title_model_1.Game.find().sort({ rating: -1 }).limit(10);
    return [title, top10];
}
exports.findByQuery = findByQuery;
async function findByTags(tags) {
    const top10 = await title_model_1.Game.find().sort({ rating: -1 }).limit(10);
    let title;
    if (typeof tags === 'object') {
        const reg = tags.reduce((prev, curr) => `(?=.*${curr})` + prev, '.*');
        title = await title_model_1.Game.find({ tag: { $regex: reg } });
    }
    else {
        title = await title_model_1.Game.find({ tag: { $regex: tags } });
    }
    return [title, top10];
}
exports.findByTags = findByTags;
async function findTitleDetails(id) {
    const title = await title_model_1.Game.findOne({ name: id });
    const comment = await comment_model_1.Comment.find({ game_id: id });
    return [title, comment];
}
exports.findTitleDetails = findTitleDetails;
async function updateWishItem(id, gameId) {
    const bucket = await bucket_model_1.Bucket.findOne({ id });
    if (bucket) {
        await bucket_model_1.Bucket.updateOne({ id: id }, { $addToSet: { list: gameId } });
    }
    else {
        await bucket_model_1.Bucket.create({ id: id, list: [gameId] });
    }
}
exports.updateWishItem = updateWishItem;
async function updateLoginComment(gameId, userId, displayName, text) {
    await comment_model_1.Comment.create({
        game_id: decodeURI(gameId),
        id: userId,
        name: displayName,
        text: text.replace(/\n/g, '<br>'),
    });
}
exports.updateLoginComment = updateLoginComment;
async function updateLogoutComment(gameId, userName, password, text) {
    await comment_model_1.Comment.create({
        game_id: decodeURI(gameId),
        name: userName,
        password,
        text: text.replace(/\n/g, '<br>'),
    });
}
exports.updateLogoutComment = updateLogoutComment;
async function deleteLoginComment(userId, commentId) {
    await comment_model_1.Comment.deleteOne({
        _id: new mongodb_1.ObjectId(commentId),
        id: userId,
    });
}
exports.deleteLoginComment = deleteLoginComment;
async function deleteLogoutComment(commentId, password) {
    const result = await comment_model_1.Comment.findOneAndDelete({
        _id: new mongodb_1.ObjectId(commentId),
        password: password,
    });
    return result;
}
exports.deleteLogoutComment = deleteLogoutComment;
