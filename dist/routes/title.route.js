"use strict";
const express = require("express");
const Title = require("../controllers/title.controller");
const router = express.Router();
router.get('/', Title.readTitle);
router.get('/filter', Title.readKeyword);
router.get('/:id', Title.readDetails);
router.post('/bucket', Title.updateWishItem);
router.post('/:id', Title.createComment);
router.delete('/:id', Title.deleteComment);
module.exports = router;
