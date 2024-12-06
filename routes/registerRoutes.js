const express = require('express');
const router = express.Router();
const {showRegister,traiteRegister} = require('../controllers/RegisterController');

router.get("/", showRegister)
router.post("/", traiteRegister)

module.exports = router;