const db = require("../db/db");

function showPanier(req, res){
    res.render('PanierView', {title: 'Panier',loggedIn: req.session.loggedIn});
}

module.exports = {showPanier};