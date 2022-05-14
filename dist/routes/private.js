"use strict";
const express = require("express");
const private_controller_1 = require("../controllers/private.controller");
const router = express.Router();
// MY 페이지 조회
router.get('/', private_controller_1.getPrivate);
// MY 페이지 아이템 삭제
router.post('/delete', private_controller_1.deleteItem);
// MY 페이지 아이템 리셋
router.post('/reset', private_controller_1.resetBucket);
module.exports = router;
