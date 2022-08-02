"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCurrency = exports.createInquiry = exports.readEtc = exports.readHome = exports.readDomain = void 0;
const etc_service_1 = require("../services/etc.service");
const load_profile_1 = require("../utils/load_profile");
const regular_expressions_1 = require("../utils/regular_expressions");
const currency_api_1 = require("../utils/currency_api");
const readDomain = async (req, res) => res.redirect('/home');
exports.readDomain = readDomain;
// 메인 페이지 조회
const readHome = async (req, res, next) => {
    try {
        const { currency } = req.cookies;
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        const { best, recent, sale } = await (0, etc_service_1.findSortedList)();
        const exchangeRate = await (0, currency_api_1.default)();
        res.render('index', { best, recent, sale, status, profileImg, currency, exchangeRate });
    }
    catch (error) {
        return next(error);
    }
};
exports.readHome = readHome;
// 고객 지원 페이지 조회
const readEtc = async (req, res, next) => {
    try {
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        const email = (0, load_profile_1.loadProfileEmail)(status, req);
        return res.render('etc', { status, email, profileImg });
    }
    catch (error) {
        return next(error);
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
            return res.send(`<script>alert('감사합니다!');location.href='/etc';</script>`);
        }
        return res.send(`<script>alert('${validationMsg}');location.href='/etc';</script>`);
    }
    catch (error) {
        return next(error);
    }
};
exports.createInquiry = createInquiry;
// 화폐 선택
const changeCurrency = async (req, res, next) => {
    try {
        const { currency } = req.body;
        res.cookie('currency', currency).redirect('back');
    }
    catch (error) {
        return next(error);
    }
};
exports.changeCurrency = changeCurrency;
