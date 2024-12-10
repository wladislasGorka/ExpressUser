const db = require("../db/db");

function showAnnonce(req, res){
    const annonceId = req.params.id;
    const query = 'SELECT * FROM annonces WHERE id=?';
    db.get(query,[annonceId],function (err,row){
        if(err){
            console.error('Erreur showAnnonce');
            res.send('ERROR');
        }else{
            if(row){
                res.render('AnnonceView', {title: 'User', loggedIn: req.session.loggedIn, annonce: row});
            }else{
                console.error('Annonce introuvable');
                res.render('AnnonceView', {title: 'User', loggedIn: req.session.loggedIn});
            }
        }
    })    
}

module.exports = {showAnnonce};