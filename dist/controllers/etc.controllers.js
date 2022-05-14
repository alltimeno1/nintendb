"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInquery = exports.etc = exports.domain = void 0;
const etc_services_1 = require("../services/etc.services");
const load_profile_1 = require("../utils/load_profile");
const regular_expressions_1 = require("../utils/regular_expressions");
const express_1 = require("../utils/express");
const domain = async (req, res) => res.redirect('/home');
exports.domain = domain;
const etc = async (req, res, next) => {
    try {
        const { page } = req.params;
        const status = req.isAuthenticated();
        const profileImg = (0, load_profile_1.loadProfileImg)(status, req);
        if (page === 'home') {
            const [best, recent, sale] = await (0, etc_services_1.getSortedList)();
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
exports.etc = etc;
const postInquery = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        const validationMsg = (0, regular_expressions_1.boardRegExp)('', message, name, '', email);
        if (!validationMsg) {
            await (0, etc_services_1.sendEmail)(name, email, message);
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
exports.postInquery = postInquery;
