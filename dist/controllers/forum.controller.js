"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLikes = exports.updatePost = exports.deletePost = exports.createPost = exports.readPost = exports.readUpdate = exports.readForm = exports.readKeyword = exports.readForum = void 0;
const requestIp = require("request-ip");
const bcrypt = require("bcrypt");
const regular_expressions_1 = require("../utils/regular_expressions");
const load_profile_1 = require("../utils/load_profile");
const Forum = require("../services/forum.service");
const throwError_1 = require("../utils/throwError");
// 게시판 조회
const readForum = async (req, res, next) => {
    try {
        const post = await Forum.findBoard();
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        return res.render('forum', { post, status, profileImg });
    }
    catch (error) {
        return next(error);
    }
};
exports.readForum = readForum;
// 게시판 특정 키워드 조회
const readKeyword = async (req, res, next) => {
    try {
        const { sortBy, keyword } = req.query;
        const post = await Forum.findKeyword(sortBy, keyword);
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        return res.render('forum', { post, status, profileImg });
    }
    catch (error) {
        return next(error);
    }
};
exports.readKeyword = readKeyword;
// 게시글 등록 페이지 조회
const readForm = async (req, res, next) => {
    // #swagger.tags = ['Forum']
    try {
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        return res.render('form', { status, profileImg });
    }
    catch (error) {
        return next(error);
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
        return res.render('update_form', { post, status, checkMyPost, profileImg });
    }
    catch (error) {
        return next(error);
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
            (0, throwError_1.default)(404, '페이지를 찾을 수 없습니다.');
        }
        return res.render('post', { post, status, checkMyPost, profileImg });
    }
    catch (error) {
        return next(error);
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
            return res.redirect('forum');
        }
        const { nickname, password } = req.body;
        const message = (0, regular_expressions_1.boardRegExp)(title, '', nickname, password, '');
        if (!message && text) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await Forum.insertLogoutPost(title, nickname, hashedPassword, text);
            return res.redirect('forum');
        }
        return res.send(`<script>alert('${message}');location.href='/form';</script>`);
    }
    catch (error) {
        return next(error);
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
            return res.redirect('/forum');
        }
        const hashedPassword = await Forum.findLogoutPost(postId);
        if (!hashedPassword) {
            (0, throwError_1.default)(404, '페이지를 찾을 수 없습니다.');
            return;
        }
        const samePassword = await bcrypt.compare(password, hashedPassword);
        if (!samePassword) {
            return res.send(`<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/forum/${id}';</script>`);
        }
        await Forum.deleteLogoutPost(postId);
        return res.redirect('/forum');
    }
    catch (error) {
        return next(error);
    }
};
exports.deletePost = deletePost;
// 게시글 수정
const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.body.userId) {
            const { title, userId, text } = req.body;
            await Forum.updateLoginPost(id, userId, title, text);
            return res.redirect(`/forum/${id}`);
        }
        const { title, nickname, password, text } = req.body;
        const hashedPassword = await Forum.findLogoutPost(id);
        if (!hashedPassword) {
            (0, throwError_1.default)(404, '페이지를 찾을 수 없습니다.');
            return;
        }
        const samePassword = await bcrypt.compare(password, hashedPassword);
        if (!samePassword) {
            return res.send(`<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/forum/${id}/update';</script>`);
        }
        await Forum.updateLogoutPost(id, title, nickname, text);
        return res.redirect(`/forum/${id}`);
    }
    catch (error) {
        return next(error);
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
        return res.redirect(`/forum/${id}`);
    }
    catch (error) {
        return next(error);
    }
};
exports.updateLikes = updateLikes;
