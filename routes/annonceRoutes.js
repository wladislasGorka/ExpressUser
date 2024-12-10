const express = require('express');
const AnnonceController = require('../controllers/AnnonceController');

const router = express.Router();

router.route('/:id')
    .get(AnnonceController.showAnnonce)

module.exports = router;