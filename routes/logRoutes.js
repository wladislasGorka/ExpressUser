const express = require('express');
const {showLogin,traiteLogin,traiteLogout} = require('../controllers/LogController');

const router = express.Router();

router.get("/login", showLogin)
router.post("/login", traiteLogin)
router.get("/logout", traiteLogout)

module.exports = router;