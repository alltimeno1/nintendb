"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecommend = exports.updateLogoutPost = exports.updateLoginPost = exports.deleteLogoutPost = exports.findLogoutPost = exports.deleteLoginPost = exports.insertLogoutPost = exports.insertLoginPost = exports.updateAndFindPost = exports.findPostLog = exports.findKeyword = exports.findBoard = void 0;
const board_model_1 = require("../models/board.model");
const count_model_1 = require("../models/count.model");
async function findBoard() {
    const posts = await board_model_1.Board.find().sort({ id: -1 });
    return posts;
}
exports.findBoard = findBoard;
async function findKeyword(sortBy, keyword) {
    const posts = await board_model_1.Board.find({ [sortBy]: { $regex: keyword } }).sort({ id: -1 });
    return posts;
}
exports.findKeyword = findKeyword;
async function findPostLog(id) {
    const post = await board_model_1.Board.findOne({ id: +id });
    return post;
}
exports.findPostLog = findPostLog;
async function updateAndFindPost(id) {
    await board_model_1.Board.updateOne({ id: +id }, { $inc: { viewCount: 1 } });
    const post = await board_model_1.Board.findOne({ id: +id });
    return post;
}
exports.updateAndFindPost = updateAndFindPost;
async function insertLoginPost(title, displayName, userId, text) {
    const postNum = await count_model_1.Count.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } });
    await board_model_1.Board.create({
        id: postNum?.count,
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
    const postNum = await count_model_1.Count.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } });
    await board_model_1.Board.create({
        id: postNum?.count,
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
    await board_model_1.Board.deleteOne({
        id: +postId,
        user_id: userId,
    });
}
exports.deleteLoginPost = deleteLoginPost;
async function findLogoutPost(postId) {
    const result = await board_model_1.Board.findOne({
        id: +postId,
    });
    return result?.password;
}
exports.findLogoutPost = findLogoutPost;
async function deleteLogoutPost(postId) {
    const result = await board_model_1.Board.deleteOne({
        id: +postId,
    });
    return result;
}
exports.deleteLogoutPost = deleteLogoutPost;
const updateLoginPost = async (id, userId, title, text) => {
    await board_model_1.Board.updateOne({ id: +id, user_id: userId }, { $set: { title, text } });
};
exports.updateLoginPost = updateLoginPost;
async function updateLogoutPost(id, title, nickname, text) {
    const result = await board_model_1.Board.findOneAndUpdate({ id: +id }, { $set: { title, nickname, text } });
    return result;
}
exports.updateLogoutPost = updateLogoutPost;
async function updateRecommend(postId, id) {
    await board_model_1.Board.updateOne({ id: +postId }, { $addToSet: { recommend: id } });
}
exports.updateRecommend = updateRecommend;
