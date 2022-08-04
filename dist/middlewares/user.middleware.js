"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const load_profile_1 = require("../utils/load_profile");
function getUserInfo(req, res, next) {
    const status = req.isAuthenticated();
    const profileImg = (0, load_profile_1.loadProfileImg)(req);
    const email = (0, load_profile_1.loadProfileEmail)(req);
    res.locals.user = { status, profileImg, email };
    next();
}
exports.getUserInfo = getUserInfo;
