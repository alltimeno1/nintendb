"use strict";
const express = require("express");
const mongo_1 = require("../utils/mongo");
const requestIp = require("request-ip");
const express_1 = require("../utils/express");
const router = express.Router();
// MY 페이지 조회
router.get('/', async (req, res, next) => {
    try {
        const games = await (0, mongo_1.connectCollection)('games');
        const buckets = await (0, mongo_1.connectCollection)('buckets');
        const status = req.isAuthenticated();
        let myBucket;
        if (req.isAuthenticated()) {
            const { id: user_id } = req.user;
            myBucket = await buckets.findOne({ user_id });
        }
        else {
            const ip = requestIp.getClientIp(req);
            myBucket = await buckets.findOne({ address: ip });
        }
        const result = await games.find({ name: { $in: myBucket?.list || [] } }).toArray();
        res.render('private', { result, status });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// MY 페이지 아이템 삭제
router.post('/delete', async (req, res, next) => {
    try {
        const buckets = await (0, mongo_1.connectCollection)('buckets');
        if (req.isAuthenticated()) {
            const { id: user_id } = req.user;
            await buckets.updateOne({ user_id }, { $pull: { list: req.body.titleName } });
        }
        else {
            const ip = requestIp.getClientIp(req);
            await buckets.updateOne({ address: ip }, { $pull: { list: req.body.titleName } });
        }
        res.redirect('/private');
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// MY 페이지 아이템 리셋
router.post('/reset', async (req, res, next) => {
    try {
        const buckets = await (0, mongo_1.connectCollection)('buckets');
        if (req.isAuthenticated()) {
            const { id: user_id } = req.user;
            await buckets.updateOne({ user_id }, { $set: { list: [] } });
        }
        else {
            const ip = requestIp.getClientIp(req);
            await buckets.updateOne({ address: ip }, { $set: { list: [] } });
        }
        res.redirect('/private');
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
module.exports = router;
