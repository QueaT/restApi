const express = require('express');
const router = express.Router();
const ordersModels = require('./ordersRoutesModels/ordersModels');


router.route('/')
    .get(ordersModels.get$)
    .post(ordersModels.post$)

router.route('/:orderId')
    .get(ordersModels.getById)
    .delete(ordersModels.deleteById)
module.exports = router;