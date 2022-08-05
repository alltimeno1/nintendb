"use strict";
/* eslint-disable no-underscore-dangle */
function getUserInfo(req, res, next) {
    const status = req.isAuthenticated();
    const profileImg = req.user?._json?.profile_image || 'static/img/profile_placeholder.png';
    const email = req.user?._json?.email || '';
    res.locals.user = { status, profileImg, email };
    next();
}
module.exports = getUserInfo;
