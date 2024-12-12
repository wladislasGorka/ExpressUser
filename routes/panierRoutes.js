const express = require('express');
const panierController = require('../controllers/PanierController');

const router = express.Router();

router.route("/")
    .get(panierController.showPanier)
router.route("/:id")
    .delete(panierController.deleteFromPanier)
router.route("/modif/:id")
    .post(panierController.addPanier)
    .delete(panierController.deletePanierItem)

module.exports = router;