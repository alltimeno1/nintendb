"use strict";
const express = require("express");
const mongodb_1 = require("mongodb");
const requestIp = require("request-ip");
const mongo_1 = require("../utils/mongo");
const regular_expressions_1 = require("../utils/regular_expressions");
const express_1 = require("../utils/express");
const load_profile_1 = require("../utils/load_profile");
const router = express.Router();
// 모든 게임 조회
router.get('/', async (req, res, next) => {
    try {
        const { sort } = req.query;
        const games = await (0, mongo_1.connectCollection)('games');
        const title = await games
            .find()
            .sort({ [sort]: -1 })
            .toArray();
        const top10 = await games.find().sort({ rating: -1 }).limit(10).toArray();
        const status = req.isAuthenticated();
        let profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('title', { top10, title, status, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 특정 키워드 게임 조회
router.get('/filter', async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const games = await (0, mongo_1.connectCollection)('games');
        const title = await games.find({ name: { $regex: keyword } }).toArray();
        const top10 = await games.find().sort({ rating: -1 }).limit(10).toArray();
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('title', { top10, title, status, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 게임 정보 조회
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const games = await (0, mongo_1.connectCollection)('games');
        const comments = await (0, mongo_1.connectCollection)('comments');
        const title = await games.findOne({ name: id });
        const comment = await comments.find({ game_id: id }).toArray();
        const status = req.isAuthenticated();
        if (!title) {
            res.status(404).send({
                message: 'There is no title with the id or DB disconnected :(',
            });
        }
        if (status) {
            const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
            res.render('title_info_login', { title, comment, profileImg });
        }
        else {
            res.render('title_info', { title, comment });
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 찜하기
router.post('/bucket', async (req, res, next) => {
    try {
        const { game_id } = req.body;
        const buckets = await (0, mongo_1.connectCollection)('buckets');
        if (req.isAuthenticated()) {
            const { id: userId } = req.user;
            const bucket = await buckets.findOneAndUpdate({ id: userId }, { $addToSet: { list: game_id } });
            if (!bucket.value) {
                await buckets.insertOne({ id: userId, list: [game_id] });
            }
        }
        else {
            const ip = requestIp.getClientIp(req);
            const bucket = await buckets.findOneAndUpdate({ id: ip }, { $addToSet: { list: game_id } });
            if (!bucket.value) {
                await buckets.insertOne({ id: ip, list: [game_id] });
            }
        }
        res.send(`<script>alert('관심 목록에 ${game_id}가 추가되었습니다!');location.href='/title/${game_id}';</script>`);
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 댓글 등록
router.post('/:id', async (req, res, next) => {
    try {
        const comments = await (0, mongo_1.connectCollection)('comments');
        const { game_id, text } = req.body;
        if (req.isAuthenticated()) {
            const { displayName, id: user_id } = req.user;
            await comments.insertOne({
                game_id: decodeURI(game_id),
                id: user_id,
                name: displayName,
                text: text.replace(/\n/g, '<br>'),
            });
            res.redirect(`/title/${game_id}`);
        }
        else {
            const { game_id, user_name, password, text } = req.body;
            const message = (0, regular_expressions_1.boardRegExp)('', text, user_name, password, '');
            if (!message) {
                await comments.insertOne({
                    game_id: decodeURI(game_id),
                    name: user_name,
                    password,
                    text: text.replace(/\n/g, '<br>'),
                });
                res.redirect(`/title/${game_id}`);
            }
            else {
                res.send(`<script>alert('${message}');location.href='/title/${game_id}';</script>`);
            }
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 댓글 삭제
router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { comment_id, password, title_id } = req.body;
        const comments = await (0, mongo_1.connectCollection)('comments');
        if (req.isAuthenticated()) {
            const { id: user_id } = req.user;
            await comments.deleteOne({
                _id: new mongodb_1.ObjectId(comment_id),
                id: user_id,
            });
        }
        else {
            const result = await comments.findOneAndDelete({
                _id: new mongodb_1.ObjectId(comment_id),
                password: password,
            });
            if (!result.value) {
                return res.send(`<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/title/${id}';</script>`);
            }
        }
        res.redirect(`/title/${title_id}`);
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
module.exports = router;
