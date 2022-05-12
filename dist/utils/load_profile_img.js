"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadProfileImg(status, req) {
    let profileImg = 'static/img/profile_placeholder.png';
    if (status) {
        const { _json } = req.user;
        profileImg = _json.profile_image || profileImg;
    }
    console.log(profileImg);
    return profileImg;
}
exports.default = loadProfileImg;
