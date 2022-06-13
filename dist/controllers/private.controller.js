"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBucket = exports.updateBucket = exports.readPrivate = void 0;
const requestIp = require("request-ip");
const checkErrorType_1 = require("../utils/checkErrorType");
const load_profile_1 = require("../utils/load_profile");
const private_service_1 = require("../services/private.service");
// MY 페이지 조회
const readPrivate = async (req, res, next) => {
    try {
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        let myBucket;
        let nickname = '익명';
        if (status) {
            const { id: userId, displayName } = req.user;
            myBucket = await (0, private_service_1.findMyBucket)(userId);
            nickname = displayName;
        }
        else {
            const ip = requestIp.getClientIp(req);
            myBucket = await (0, private_service_1.findMyBucket)(ip);
        }
        const result = await (0, private_service_1.findBucketList)(myBucket);
        res.render('private', { result, status, profileImg, nickname });
    }
    catch (error) {
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.readPrivate = readPrivate;
// MY 페이지 아이템 삭제
const updateBucket = async (req, res, next) => {
    try {
        const { titleName } = req.body;
        const status = req.isAuthenticated();
        if (status) {
            const { id: userId } = req.user;
            await (0, private_service_1.updateItem)(userId, titleName);
        }
        else {
            const address = requestIp.getClientIp(req);
            await (0, private_service_1.updateItem)(address, titleName);
        }
        res.redirect('/private');
    }
    catch (error) {
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.updateBucket = updateBucket;
// MY 페이지 아이템 리셋
const deleteBucket = async (req, res, next) => {
    try {
        const status = req.isAuthenticated();
        if (status) {
            const { id: userId } = req.user;
            await (0, private_service_1.deleteItems)(userId);
        }
        else {
            const address = requestIp.getClientIp(req);
            await (0, private_service_1.deleteItems)(address);
        }
        res.redirect('/private');
    }
    catch (error) {
        return next((0, checkErrorType_1.default)(error));
    }
};
exports.deleteBucket = deleteBucket;
