"use strict";
const express = require("express");
const etc_controller_1 = require("../controllers/etc.controller");
const router = express.Router();
router.get('/', etc_controller_1.readDomain);
router.get('/home', etc_controller_1.readHome);
router.get('/etc', etc_controller_1.readEtc);
router.post('/inquiry', etc_controller_1.createInquiry);
module.exports = router;
