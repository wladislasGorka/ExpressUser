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
    const query = "SELECT * FROM annonces LEFT JOIN paniers ON annonces.id=paniers.annonceId AND userId=?";
    db.all(query,[req.session.userId],(err,rows) => {
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