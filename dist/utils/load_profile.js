"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProfileEmail = exports.loadProfileImg = void 0;
function loadProfileImg(status, req) {
    let profileImg = 'static/img/profile_placeholder.png';
    if (status) {
        profileImg = req.user._json.profile_image || profileImg;
    }
    return profileImg;
}
exports.loadProfileImg = loadProfileImg;
function loadProfileEmail(status, req) {
    let email = '';
    if (status) {
        email = req.user._json.email || '';
    }
    return email;
}
exports.loadProfileEmail = loadProfileEmail;
