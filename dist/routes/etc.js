"use strict";
const express = require("express");
const mongo_1 = require("../utils/mongo");
const regular_expressions_1 = require("../utils/regular_expressions");
const express_1 = require("../utils/express");
const router = express.Router();
router.get('/', (req, res) => res.redirect('/home'));
router.get('/:page', async (req, res, next) => {
    try {
        const { page } = req.params;
        const games = await (0, mongo_1.connectCollection)('games');
        const status = req.isAuthenticated();
        if (page === 'home') {
            const best = await games.find().sort({ rating: -1 }).limit(4).toArray();
            const recent = await games.find().sort({ date: -1 }).limit(4).toArray();
            const sale = await games.find().sort({ discountRate: -1 }).limit(4).toArray();
            res.render('index', { best, recent, sale, status });
        }
        else if (page === 'etc') {
            let email = '';
            if (status) {
                const { _json } = req.user;
                email = _json.email;
            }
            res.render(`${page}`, { status, email });
        }
        else {
            res.render(`${page}`, { status });
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
// 문의하기
router.post('/etc', async (req, res, next) => {
    try {
        const inquery = await (0, mongo_1.connectCollection)('inquery');
        const { name, email, message } = req.body;
        const validationMsg = (0, regular_expressions_1.boardRegExp)('', message, name, '', email);
        if (!validationMsg) {
            await inquery.insertOne({
                name,
                email,
                message,
            });
            res.send(`<script>alert('감사합니다!');location.href='/etc';</script>`);
        }
        else {
            res.send(`<script>alert('${validationMsg}');location.href='/etc';</script>`);
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
});
module.exports = router;
