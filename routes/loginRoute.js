const express = require('express');
const router = express.Router();
const loginModel = require('./loginRoutesModels/loginRouteModel');

router.route('/')
    .post(loginModel.post)
    .get(loginModel.get$)
module.exports = router;