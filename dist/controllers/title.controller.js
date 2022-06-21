"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = exports.updateWishItem = exports.readDetails = exports.readKeyword = exports.readTitle = void 0;
const bcrypt = require("bcrypt");
const requestIp = require("request-ip");
const regular_expressions_1 = require("../utils/regular_expressions");
const checkErrorType_1 = require("../utils/checkErrorType");
const load_profile_1 = require("../utils/load_profile");
const Title = require("../services/title.service");
const throwError_1 = require("../utils/throwError");
const currency_api_1 = require("../utils/currency_api");
// 모든 게임 조회
const readTitle = async (req, res, next) => {
    // #swagger.tags = ['Title']
    try {
        const { currency } = req.cookies;
        const { sort } = req.query;
        const [title, top10] = await Title.findTitles(sort);
        const status = req.isAuthenticated();
        let profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        const exchangeRate = await (0, currency_api_1.default)();
        res.render('title', { top10, title, status, profileImg, currency, exchangeRate });
    }
    catch (error) {
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.readTitle = readTitle;
// 특정 키워드 게임 조회
const readKeyword = async (req, res, next) => {
    // #swagger.tags = ['Title']
    try {
        const { currency } = req.cookies;
        const { keyword, tags } = req.query;
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        if (keyword) {
            const [title, top10] = await Title.findByQuery(keyword);
            return res.render('title', { top10, title, status, profileImg });
        }
        if (tags) {
            const [title, top10] = await Title.findByTags(tags);
            return res.render('title', { top10, title, status, profileImg, tags, currency });
        }
        res.redirect('/title');
    }
    catch (error) {
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.readKeyword = readKeyword;
// 게임 정보 조회
const readDetails = async (req, res, next) => {
    // #swagger.tags = ['Title']
    try {
        const { id } = req.params;
        const [title, comment] = await Title.findTitleDetails(id);
        const status = req.isAuthenticated();
        if (!title) {
            (0, throwError_1.default)(404, 'There is no title with the id or DB disconnected :(');
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
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.readDetails = readDetails;
// 찜하기
const updateWishItem = async (req, res, next) => {
    // #swagger.tags = ['Title']
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
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.updateWishItem = updateWishItem;
// 댓글 등록
const createComment = async (req, res, next) => {
    // #swagger.tags = ['Title']
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
                const hashedPassword = await bcrypt.hash(password, 10);
                await Title.updateLogoutComment(gameId, userName, hashedPassword, text);
                res.redirect(`/title/${gameId}`);
            }
            else {
                res.send(`<script>alert('${message}');location.href='/title/${gameId}';</script>`);
            }
        }
    }
    catch (error) {
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.createComment = createComment;
// 댓글 삭제
const deleteComment = async (req, res, next) => {
    // #swagger.tags = ['Title']
    try {
        const { id } = req.params;
        const { commentId, password } = req.body;
        if (req.isAuthenticated()) {
            const { id: userId } = req.user;
            await Title.deleteLoginComment(userId, commentId);
        }
        else {
            const hashedPassword = await Title.findLogoutComment(commentId);
            if (!hashedPassword) {
                (0, throwError_1.default)(404, '요청하신 번호의 댓글이 존재하지 않습니다.');
                return;
            }
            const samePassword = await bcrypt.compare(password, hashedPassword);
            if (!samePassword) {
                return res.send(`<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/title/${id}';</script>`);
            }
            await Title.deleteLogoutComment(commentId);
        }
        res.redirect(`/title/${id}`);
    }
    catch (error) {
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.deleteComment = deleteComment;
