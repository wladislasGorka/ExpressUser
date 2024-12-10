const express = require('express');
const router = express.Router();
const registerController = require('../controllers/RegisterController');

router.route("/")
    .get(registerController.showRegister)
    .post(registerController.traiteRegister)

module.exports = router;