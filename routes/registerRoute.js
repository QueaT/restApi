const express = require('express');
const router = express.Router();
const loginModel = require('./loginRoutesModels/loginRouteModel');

router.route('/')
    .get(loginModel.get$)
    .post(loginModel.register)

router.route('/:orderId')
    .post(loginModel.register)
module.exports = router;