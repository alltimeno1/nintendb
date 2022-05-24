"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLikes = exports.updatePost = exports.deletePost = exports.createPost = exports.readPost = exports.readUpdate = exports.readForm = exports.readForum = void 0;
const requestIp = require("request-ip");
const regular_expressions_1 = require("../utils/regular_expressions");
const express_1 = require("../utils/express");
const load_profile_1 = require("../utils/load_profile");
const Forum = require("../services/forum.service");
// 게시판 조회
const readForum = async (req, res, next) => {
    try {
        const post = await Forum.findBoard();
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('forum', { post, status, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readForum = readForum;
// 게시글 등록 페이지 조회
const readForm = async (req, res, next) => {
    try {
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('form', { status, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readForm = readForm;
// 게시글 수정 페이지 조회
const readUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Forum.findPostLog(id);
        const status = req.isAuthenticated();
        const checkMyPost = req.user && post ? req.user.id === post.user_id : false;
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('update_form', { post, status, checkMyPost, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readUpdate = readUpdate;
// 게시글 조회
const readPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Forum.updateAndFindPost(id);
        const status = req.isAuthenticated();
        const checkMyPost = req.user && post ? req.user.id === post.user_id : false;
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        if (!post) {
            res.status(404).send({
                message: 'There is no post with the id or DB disconnected :(',
            });
        }
        return res.render('post', { post, status, checkMyPost, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readPost = readPost;
// 게시글 등록
const createPost = async (req, res, next) => {
    try {
        const { title, text } = req.body;
        if (req.isAuthenticated()) {
            const { displayName, id: userId } = req.user;
            await Forum.insertLoginPost(title, displayName, userId, text);
            res.redirect('forum');
        }
        else {
            const { nickname, password } = req.body;
            const message = (0, regular_expressions_1.boardRegExp)(title, '', nickname, password, '');
            if (!message && text) {
                await Forum.insertLogoutPost(title, nickname, password, text);
                res.redirect('forum');
            }
            else {
                res.send(`<script>alert('${message}');location.href='/form';</script>`);
            }
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.createPost = createPost;
// 게시글 삭제
const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { postId, userId, password } = req.body;
        if (userId) {
            await Forum.deleteLoginPost(postId, userId);
            res.redirect('/forum');
        }
        else {
            const result = await Forum.deleteLogoutPost(postId, password);
            if (result.deletedCount) {
                res.redirect('/forum');
            }
            else {
                res.send(`<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/forum/${id}';</script>`);
            }
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.deletePost = deletePost;
// 게시글 수정
const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.body.user_id) {
            const { title, userId, text } = req.body;
            await Forum.updateLoginPost(id, userId, title, text);
            res.redirect(`/forum/${id}`);
        }
        else {
            const { title, nickname, password, text } = req.body;
            const result = await Forum.updateLogoutPost(id, password, title, nickname, text);
            if (result) {
                res.redirect(`/forum/${id}`);
            }
            else {
                res.send(`<script>alert('비밀번호를 정확히 입력해주세요!.');location.href='/forum/update/${id}';</script>`);
            }
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.updatePost = updatePost;
// 게시글 추천
const updateLikes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { postId, userId } = req.body;
        if (userId) {
            await Forum.updateRecommend(postId, userId);
        }
        else {
            const ip = requestIp.getClientIp(req);
            await Forum.updateRecommend(postId, ip);
        }
        res.redirect(`/forum/${id}`);
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.updateLikes = updateLikes;
