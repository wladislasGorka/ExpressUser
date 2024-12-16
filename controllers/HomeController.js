const db = require("../db/db");

function showAnnonces(req, res){
    const userId = req.session.userId;
    // la requete permet d'avoir toutes les annonces avec une valeur userId=null si pas dans le panier
    const query = "SELECT * FROM annonces LEFT JOIN paniers ON paniers.annonceId=id AND userId=?;";
    db.all(query,[userId],(err,rows) => {
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
    const userId = req.session.userId;
    let query;
    if(filtre==="all"){
        // la requete permet d'avoir toutes les annonces avec une valeur userId=null si pas dans le panier
        query = "SELECT * FROM annonces LEFT JOIN paniers ON paniers.annonceId=id AND userId=?;";
        db.all(query,[userId],(err,rows) => {
            if(err){
                console.error('Erreur: showAnnoncesView request');
                throw err;
            }
            if(rows){
                res.send(rows);
            }else{
                res.send([]);
            }
        });
    }else{
        // la requete permet d'avoir toutes les annonces avec une valeur userId=null si pas dans le panier
        query = "SELECT * FROM annonces LEFT JOIN paniers ON paniers.annonceId=id AND userId=? WHERE category=?;";
        db.all(query,[userId,filtre],(err,rows) => {
            if(err){
                console.error('Erreur: showAnnoncesView request');
                throw err;
            }
            if(rows){
                res.send(rows);
            }else{
                res.send([]);
            }
        });
    }
}

module.exports={showAnnonces,showAnnoncesFiltre};