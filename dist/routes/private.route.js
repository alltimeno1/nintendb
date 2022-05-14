"use strict";
const express = require("express");
const private_controller_1 = require("../controllers/private.controller");
const router = express.Router();
router.get('/', private_controller_1.readPrivate);
router.post('/delete', private_controller_1.deleteItem);
router.post('/reset', private_controller_1.deleteBucket);
module.exports = router;
