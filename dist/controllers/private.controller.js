"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetBucket = exports.deleteItem = exports.getPrivate = void 0;
const requestIp = require("request-ip");
const express_1 = require("../utils/express");
const load_profile_1 = require("../utils/load_profile");
const private_service_1 = require("../services/private.service");
const getPrivate = async (req, res, next) => {
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
        const result = await (0, private_service_1.showMyBucket)(myBucket);
        res.render('private', { result, status, profileImg, nickname });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.getPrivate = getPrivate;
const deleteItem = async (req, res, next) => {
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
        return next((0, express_1.default)(error));
    }
};
exports.deleteItem = deleteItem;
const resetBucket = async (req, res, next) => {
    try {
        const status = req.isAuthenticated();
        if (status) {
            const { id: userId } = req.user;
            await (0, private_service_1.updateItems)(userId);
        }
        else {
            const address = requestIp.getClientIp(req);
            await (0, private_service_1.updateItems)(address);
        }
        res.redirect('/private');
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.resetBucket = resetBucket;
