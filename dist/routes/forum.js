"use strict";
const express = require("express");
const requestIp = require("request-ip");
const mongo_1 = require("../utils/mongo");
const regular_expressions_1 = require("../utils/regular_expressions");
const express_1 = require("../utils/express");
const load_profile_1 = require("../utils/load_profile");
const router = express.Router();
// 게시판 조회
router.get('/', async (req, res, next) => {
    try {
        const board = await (0, mongo_1.connectCollection)('board');
        const post = await board.find().sort({ id: -1 }).toArray();
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('forum', { post, status, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 게시글 등록 페이지 조회
router.get('/post', async (req, res, next) => {
    try {
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('form', { status, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 게시글 수정 페이지 조회
router.get('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const board = await (0, mongo_1.connectCollection)('board');
        const post = await board.findOne({ id: parseInt(id) });
        const status = req.isAuthenticated();
        const checkMyPost = req.user && post ? req.user.id === post.user_id : false;
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('update_form', { post, status, checkMyPost, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 게시글 조회
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const board = await (0, mongo_1.connectCollection)('board');
        await board.updateOne({ id: parseInt(id) }, { $inc: { viewCount: 1 } });
        const post = await board.findOne({ id: parseInt(id) });
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
});
// 게시글 등록
router.post('/', async (req, res, next) => {
    try {
        const { title, text } = req.body;
        const board = await (0, mongo_1.connectCollection)('board');
        const counts = await (0, mongo_1.connectCollection)('counts');
        const postNum = await counts.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } });
        if (req.isAuthenticated()) {
            const { displayName, id: user_id } = req.user;
            await board.insertOne({
                id: postNum.value?.count,
                title,
                nickname: displayName,
                user_id,
                text: text.replace(/\n/g, '<br>'),
                date: new Date(),
                viewCount: 0,
                recommend: [],
            });
            res.redirect('forum');
        }
        else {
            const { nickname, password } = req.body;
            const message = (0, regular_expressions_1.boardRegExp)(title, '', nickname, password, '');
            if (!message && text) {
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
});
// 게시글 삭제
router.post('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { post_id, user_id, password } = req.body;
        const board = await (0, mongo_1.connectCollection)('board');
        if (user_id) {
            await board.deleteOne({
                id: parseInt(post_id),
                user_id,
            });
            res.redirect('/forum');
        }
        else {
            const result = await board.deleteOne({
                id: parseInt(post_id),
                password: password,
            });
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
});
// 게시글 수정
router.post('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const board = await (0, mongo_1.connectCollection)('board');
        if (req.body.user_id) {
            const { title, user_id, text } = req.body;
            await board.updateOne({ id: parseInt(id), user_id }, { $set: { title, text } });
            res.redirect(`/forum/${id}`);
        }
        else {
            const { title, nickname, password, text } = req.body;
            const result = await board.findOneAndUpdate({ id: parseInt(id), password }, { $set: { title, nickname, text } });
            if (result.value) {
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
});
// 게시글 추천
router.post('/:id/recommend', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { post_id, user_id } = req.body;
        const board = await (0, mongo_1.connectCollection)('board');
        if (user_id) {
            await board.updateOne({ id: parseInt(post_id) }, { $addToSet: { recommend: user_id } });
        }
        else {
            const ip = requestIp.getClientIp(req);
            await board.updateOne({ id: parseInt(post_id) }, { $addToSet: { recommend: ip } });
        }
        res.redirect(`/forum/${id}`);
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
module.exports = router;
