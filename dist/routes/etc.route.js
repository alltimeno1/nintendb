"use strict";
const express = require("express");
const etc_controller_1 = require("../controllers/etc.controller");
const router = express.Router();
router.get('/', etc_controller_1.readDomain);
router.get('/:page', etc_controller_1.readEtc);
router.post('/etc', etc_controller_1.createInquery);
module.exports = router;
