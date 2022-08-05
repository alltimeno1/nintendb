"use strict";
const express = require("express");
const Private = require("../controllers/private.controller");
const router = express.Router();
router.get('/', Private.readPrivate);
router.put('/', Private.updateBucket);
router.delete('/', Private.deleteBucket);
module.exports = router;
