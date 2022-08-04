"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProfileEmail = exports.loadProfileImg = void 0;
function loadProfileImg(req) {
    const defaultImg = 'static/img/profile_placeholder.png';
    const profileImg = req.user?._json?.profile_image;
    return profileImg || defaultImg;
}
exports.loadProfileImg = loadProfileImg;
function loadProfileEmail(req) {
    const email = req.user?._json?.email || '';
    return email;
}
exports.loadProfileEmail = loadProfileEmail;
