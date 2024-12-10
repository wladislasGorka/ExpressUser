const express = require('express');
const LogController = require('../controllers/LogController');

const router = express.Router();

router.route("/login")
    .get(LogController.showLogin)
    .post(LogController.traiteLogin)
router.route("/logout")
    .get(LogController.traiteLogout)

module.exports = router;