const express = require('express');
const HomeController = require('../controllers/HomeController');

const router = express.Router();

router.route("/")
    .get(HomeController.showAnnonces)
router.route('/:filtre')
    .get(HomeController.showAnnoncesFiltre)

module.exports = router;