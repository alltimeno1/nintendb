"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBucket = exports.updateBucket = exports.readPrivate = void 0;
const requestIp = require("request-ip");
const Private = require("../services/private.service");
// MY 페이지 조회
const readPrivate = async (req, res, next) => {
    try {
        const { status, profileImg } = res.locals.user;
        let myBucket;
        let nickname = '익명';
        if (status) {
            const { id: userId, displayName } = req.user;
            myBucket = await Private.findMyBucket(userId);
            nickname = displayName;
        }
        else {
            const ip = requestIp.getClientIp(req);
            myBucket = await Private.findMyBucket(ip);
        }
        const bucket = await Private.findBucketList(myBucket);
        return res.render('private', { bucket, status, profileImg, nickname });
    }
    catch (error) {
        return next(error);
    }
};
exports.readPrivate = readPrivate;
// MY 페이지 아이템 삭제
const updateBucket = async (req, res, next) => {
    try {
        const { titleName } = req.body;
        const { status } = res.locals.user;
        if (status) {
            const { id: userId } = req.user;
            await Private.updateItem(userId, titleName);
        }
        else {
            const address = requestIp.getClientIp(req);
            await Private.updateItem(address, titleName);
        }
        return res.redirect('/private');
    }
    catch (error) {
        return next(error);
    }
};
exports.updateBucket = updateBucket;
// MY 페이지 아이템 리셋
const deleteBucket = async (req, res, next) => {
    try {
        const { status } = res.locals.user;
        if (status) {
            const { id: userId } = req.user;
            await Private.deleteItems(userId);
        }
        else {
            const address = requestIp.getClientIp(req);
            await Private.deleteItems(address);
        }
        return res.end();
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteBucket = deleteBucket;
