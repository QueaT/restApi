const express = require('express');
const router = express.Router();
const productModel = require('./productRoutesModels/routersModels')
const mongoose = require('mongoose');

router.route('/')
    .get(productModel.getAll)
    .post(productModel.post)

router.route('/:productId')
    .get(productModel.getWithId)
    .patch(productModel.patchWithId)
    .delete(productModel.deleteWithId)

module.exports = router;