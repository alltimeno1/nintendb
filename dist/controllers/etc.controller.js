"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInquery = exports.readEtc = exports.readDomain = void 0;
const etc_service_1 = require("../services/etc.service");
const load_profile_1 = require("../utils/load_profile");
const regular_expressions_1 = require("../utils/regular_expressions");
const express_1 = require("../utils/express");
const readDomain = async (req, res) => res.redirect('/home');
exports.readDomain = readDomain;
// 페이지 조회
const readEtc = async (req, res, next) => {
    try {
        const { page } = req.params;
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        if (page === 'home') {
            const [best, recent, sale] = await (0, etc_service_1.findSortedList)();
            res.render('index', { best, recent, sale, status, profileImg });
        }
        else if (page === 'etc') {
            const email = (0, load_profile_1.loadProfileEmail)(status, req);
            res.render(page, { status, email, profileImg });
        }
        else {
            res.render(page, { status, profileImg });
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readEtc = readEtc;
// 문의하기
const createInquery = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        const validationMsg = (0, regular_expressions_1.boardRegExp)('', message, name, '', email);
        if (!validationMsg) {
            await (0, etc_service_1.insertInquery)(name, email, message);
            res.send(`<script>alert('감사합니다!');location.href='/etc';</script>`);
        }
        else {
            res.send(`<script>alert('${validationMsg}');location.href='/etc';</script>`);
        }
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.createInquery = createInquery;
