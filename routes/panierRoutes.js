const express = require('express');
const panierController = require('../controllers/PanierController');

const router = express.Router();

router.route("/modif/:id")
    .post(panierController.addPanier)
    .delete(panierController.deletePanier)

module.exports = router;