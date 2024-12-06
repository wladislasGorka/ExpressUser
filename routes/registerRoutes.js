const express = require('express');
const router = express.Router();
const {showRegister,traiteRegister} = require('../controllers/UserController');

router.get("/", showRegister)
router.post("/", traiteRegister)

module.exports = router;