const Annonce = require("../models/Annonce");
const db = require("../db/db");

function showAnnonces(req, res){
    const query = "SELECT * FROM annonces";
    db.all(query,[],(err,rows) => {
        if(err){
            console.error('Erreur: showAnnoncesView request');
            throw err;
        }
        if(rows){
            res.render('index', {title: 'Home', loggedIn: req.session.loggedIn, datas: rows});
        }else{
            res.render('index', {title: 'Home', loggedIn: req.session.loggedIn});
        }
    });
    
}

module.exports={showAnnonces};