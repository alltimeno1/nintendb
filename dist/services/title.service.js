"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLogoutComment = exports.findLogoutComment = exports.deleteLoginComment = exports.updateLogoutComment = exports.updateLoginComment = exports.updateWishItem = exports.findTitleDetails = exports.findByTags = exports.findByQuery = exports.findTitles = exports.findTop10 = void 0;
const title_model_1 = require("../models/title.model");
const comment_model_1 = require("../models/comment.model");
const bucket_model_1 = require("../models/bucket.model");
const mongodb_1 = require("mongodb");
async function findTop10() {
    const top10 = await title_model_1.Game.find({}, { description: 0 }).sort({ rating: -1 }).limit(10);
    return top10;
}
exports.findTop10 = findTop10;
async function findTitles(sort) {
    const title = await title_model_1.Game.find({}, { description: 0 }).sort({ [sort]: -1 });
    return title;
}
exports.findTitles = findTitles;
async function findByQuery(keyword) {
    const title = await title_model_1.Game.find({ name: { $regex: keyword } }, { description: 0 });
    return title;
}
exports.findByQuery = findByQuery;
async function findByTags(tags) {
    let title;
    if (typeof tags === 'object') {
        const reg = tags.reduce((prev, curr) => `(?=.*${curr})` + prev, '.*');
        title = await title_model_1.Game.find({ tag: { $regex: reg } }, { description: 0 });
    }
    else {
        title = await title_model_1.Game.find({ tag: { $regex: tags } }, { description: 0 });
    }
    return title;
}
exports.findByTags = findByTags;
async function findTitleDetails(id) {
    const title = await title_model_1.Game.findOne({ name: id });
    const comment = await comment_model_1.Comment.find({ game_id: id });
    return { title, comment };
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
async function findLogoutComment(commentId) {
    const result = await comment_model_1.Comment.findOne({
        _id: new mongodb_1.ObjectId(commentId),
    });
    return result?.password;
}
exports.findLogoutComment = findLogoutComment;
async function deleteLogoutComment(commentId) {
    const result = await comment_model_1.Comment.findOneAndDelete({
        _id: new mongodb_1.ObjectId(commentId),
    });
    return result;
}
exports.deleteLogoutComment = deleteLogoutComment;
