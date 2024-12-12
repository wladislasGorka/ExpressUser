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
async function showAnnonce(req, res){
    const annonceId = req.params.id;
    const userId = req.session.userId;
    const dansPanier = await checkdansPanier(userId,annonceId);
    
    console.log(dansPanier);
    query = 'SELECT * FROM annonces WHERE id=?';
    db.get(query,[annonceId],function (err,row){
        if(err){
            console.error('Erreur showAnnonce');
            res.send('ERROR');
        }else{
            if(row){
                //console.log(req.originalUrl);
                res.render('AnnonceView', {title: 'User', loggedIn: req.session.loggedIn, annonce: row, dansPanier: dansPanier});
            }else{
                console.error('Annonce introuvable');
                res.render('AnnonceView', {title: 'User', loggedIn: req.session.loggedIn});
            }
        }
    })     
}


module.exports = {showAnnonce};