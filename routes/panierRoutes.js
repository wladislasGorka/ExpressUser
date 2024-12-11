const express = require('express');
const panierController = require('../controllers/PanierController');

const router = express.Router();

router.route("/")
    .get(panierController.showPanier)

module.exports = router;