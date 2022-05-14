"use strict";
const express = require("express");
const etc_controller_1 = require("../controllers/etc.controller");
const router = express.Router();
router.get('/', etc_controller_1.domain);
router.get('/:page', etc_controller_1.etc);
// 문의하기
router.post('/etc', etc_controller_1.postInquery);
module.exports = router;
