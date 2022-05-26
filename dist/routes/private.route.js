"use strict";
const express = require("express");
const private_controller_1 = require("../controllers/private.controller");
const router = express.Router();
router.get('/', private_controller_1.readPrivate);
router.put('/', private_controller_1.updateBucket);
router.delete('/', private_controller_1.deleteBucket);
module.exports = router;
