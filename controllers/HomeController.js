const db = require("../db/db");

function checkdansPanier(userId,annonceId){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM paniers WHERE userId=? AND annonceId=?';
        db.get(query, [userId, annonceId], (err, row) => {
            if (err) {
                console.error('Erreur showAnnonce');
                return reject(err);
            }
            if (row) {
                return resolve(true);
            }
            return resolve(false);
        });
    });
}
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
function showAnnoncesFiltre(req, res){
    console.log('filtrage');
    const filtre = req.params.filtre;
    let query;
    if(filtre==="all"){
        query = "SELECT * FROM annonces";
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
    }else{
        query = "SELECT * FROM annonces WHERE category=?";
        db.all(query,[filtre],(err,rows) => {
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
}

module.exports={showAnnonces,showAnnoncesFiltre};