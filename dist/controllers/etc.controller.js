"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCurrency = exports.createInquiry = exports.readEtc = exports.readHome = exports.readDomain = void 0;
const etc_service_1 = require("../services/etc.service");
const load_profile_1 = require("../utils/load_profile");
const regular_expressions_1 = require("../utils/regular_expressions");
const express_1 = require("../utils/express");
const readDomain = async (req, res) => res.redirect('/home');
exports.readDomain = readDomain;
// 메인 페이지 조회
const readHome = async (req, res, next) => {
    try {
        const { currency } = req.cookies;
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        const [best, recent, sale] = await (0, etc_service_1.findSortedList)();
        res.render('index', { best, recent, sale, status, profileImg, currency });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readHome = readHome;
// 고객 지원 페이지 조회
const readEtc = async (req, res, next) => {
    try {
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        const email = (0, load_profile_1.loadProfileEmail)(status, req);
        res.render('etc', { status, email, profileImg });
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.readEtc = readEtc;
// 문의하기
const createInquiry = async (req, res, next) => {
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
exports.createInquiry = createInquiry;
// 화폐 선택
const changeCurrency = async (req, res, next) => {
    try {
        const { currency } = req.body;
        console.log(currency);
        res.cookie('currency', currency).redirect('back');
    }
    catch (error) {
        return next((0, express_1.default)(error));
    }
};
exports.changeCurrency = changeCurrency;
