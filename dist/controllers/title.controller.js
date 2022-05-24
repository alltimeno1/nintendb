"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = exports.updateWishItem = exports.readDetails = exports.readKeyword = exports.readTitle = void 0;
const requestIp = require("request-ip");
const regular_expressions_1 = require("../utils/regular_expressions");
const express_1 = require("../utils/express");
const load_profile_1 = require("../utils/load_profile");
const Title = require("../services/title.service");
// 모든 게임 조회
const readTitle = async (req, res, next) => {
    try {
        const { sort } = req.query;
        const [title, top10] = await Title.findTitles(sort);
        const status = req.isAuthenticated();
        let profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('title', { top10, title, status, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readTitle = readTitle;
// 특정 키워드 게임 조회
const readKeyword = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const [title, top10] = await Title.findByQuery(keyword);
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        res.render('title', { top10, title, status, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readKeyword = readKeyword;
// 게임 정보 조회
const readDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [title, comment] = await Title.findTitleDetails(id);
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
};
exports.readDetails = readDetails;
// 찜하기
const updateWishItem = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        if (req.isAuthenticated()) {
            const { id: userId } = req.user;
            await Title.updateWishItem(userId, gameId);
        }
        else {
            const ip = requestIp.getClientIp(req);
            await Title.updateWishItem(ip, gameId);
        }
        res.send(`<script>alert('관심 목록에 ${gameId}가 추가되었습니다!');location.href='/title/${gameId}';</script>`);
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.updateWishItem = updateWishItem;
// 댓글 등록
const createComment = async (req, res, next) => {
    try {
        const { gameId, text } = req.body;
        if (req.isAuthenticated()) {
            const { displayName, id: userId } = req.user;
            await Title.updateLoginComment(gameId, userId, displayName, text);
            res.redirect(`/title/${gameId}`);
        }
        else {
            const { user_name: userName, password } = req.body;
            const message = (0, regular_expressions_1.boardRegExp)('', text, userName, password, '');
            if (!message) {
                await Title.updateLogoutComment(gameId, userName, password, text);
                res.redirect(`/title/${gameId}`);
            }
            else {
                res.send(`<script>alert('${message}');location.href='/title/${gameId}';</script>`);
            }
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.createComment = createComment;
// 댓글 삭제
const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { commentId, password, titleId } = req.body;
        if (req.isAuthenticated()) {
            const { id: userId } = req.user;
            await Title.deleteLoginComment(userId, commentId);
        }
        else {
            const result = await Title.deleteLogoutComment(commentId, password);
            if (!result) {
                return res.send(`<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/title/${id}';</script>`);
            }
        }
        res.redirect(`/title/${titleId}`);
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.deleteComment = deleteComment;
