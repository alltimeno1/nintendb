"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecommend = exports.updateLogoutPost = exports.updateLoginPost = exports.deleteLogoutPost = exports.deleteLoginPost = exports.insertLogoutPost = exports.insertLoginPost = exports.updateAndFindPost = exports.findPostLog = exports.findBoard = void 0;
const mongo_1 = require("../utils/mongo");
async function findBoard() {
    const board = await (0, mongo_1.connectCollection)('board');
    return await board.find().sort({ id: -1 }).toArray();
}
exports.findBoard = findBoard;
async function findPostLog(id) {
    const board = await (0, mongo_1.connectCollection)('board');
    return await board.findOne({ id: parseInt(id) });
}
exports.findPostLog = findPostLog;
async function updateAndFindPost(id) {
    const board = await (0, mongo_1.connectCollection)('board');
    await board.updateOne({ id: parseInt(id) }, { $inc: { viewCount: 1 } });
    return await board.findOne({ id: parseInt(id) });
}
exports.updateAndFindPost = updateAndFindPost;
async function insertLoginPost(title, displayName, userId, text) {
    const board = await (0, mongo_1.connectCollection)('board');
    const counts = await (0, mongo_1.connectCollection)('counts');
    const postNum = await counts.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } });
    await board.insertOne({
        id: postNum.value?.count,
        title,
        nickname: displayName,
        user_id: userId,
        text: text.replace(/\n/g, '<br>'),
        date: new Date(),
        viewCount: 0,
        recommend: [],
    });
}
exports.insertLoginPost = insertLoginPost;
async function insertLogoutPost(title, nickname, password, text) {
    const board = await (0, mongo_1.connectCollection)('board');
    const counts = await (0, mongo_1.connectCollection)('counts');
    const postNum = await counts.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } });
    await board.insertOne({
        id: postNum.value?.count,
        title,
        nickname,
        password,
        text: text.replace(/\n/g, '<br>'),
        date: new Date(),
        viewCount: 0,
        recommend: [],
    });
}
exports.insertLogoutPost = insertLogoutPost;
async function deleteLoginPost(postId, userId) {
    const board = await (0, mongo_1.connectCollection)('board');
    await board.deleteOne({
        id: parseInt(postId),
        user_id: userId,
    });
}
exports.deleteLoginPost = deleteLoginPost;
async function deleteLogoutPost(postId, password) {
    const board = await (0, mongo_1.connectCollection)('board');
    const result = await board.deleteOne({
        id: parseInt(postId),
        password: password,
    });
    return result;
}
exports.deleteLogoutPost = deleteLogoutPost;
const updateLoginPost = async (id, userId, title, text) => {
    const board = await (0, mongo_1.connectCollection)('board');
    await board.updateOne({ id: parseInt(id), user_id: userId }, { $set: { title, text } });
};
exports.updateLoginPost = updateLoginPost;
async function updateLogoutPost(id, password, title, nickname, text) {
    const board = await (0, mongo_1.connectCollection)('board');
    const result = await board.findOneAndUpdate({ id: parseInt(id), password }, { $set: { title, nickname, text } });
    return result;
}
exports.updateLogoutPost = updateLogoutPost;
async function updateRecommend(postId, id) {
    const board = await (0, mongo_1.connectCollection)('board');
    await board.updateOne({ id: parseInt(postId) }, { $addToSet: { recommend: id } });
}
exports.updateRecommend = updateRecommend;
