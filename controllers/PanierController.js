const db = require("../db/db");

function showPanier(req,res){
    const userId = req.session.userId;
    const query = "SELECT * FROM annonces JOIN paniers ON paniers.annonceId=id WHERE userId=?";
    db.all(query,[userId],(err,rows)=>{
        if(err){
            console.error('Erreur: showPanier');
            throw err;
        }
        if(rows){
            console.log('affichage panier');
            res.render('PanierView', {title: 'Panier', loggedIn: req.session.loggedIn, datas: rows});
        }else{
            res.render('PanierView', {title: 'Panier', loggedIn: req.session.loggedIn});
        }
    })
}

function addPanier(req, res){
    const annonceId = req.params.id;
    const userId = req.session.userId;
    let query = 'SELECT * FROM paniers WHERE userId=? AND annonceId=?';
    db.get(query,[userId,annonceId],(err,row)=>{
        if(err){
            console.error('Erreur: addPanier verif');
            throw err;
        }
        if(row){
            console.log('Annonce déjà dans le panier');
            res.end();
        }else{
            query = 'INSERT INTO paniers (userId,annonceId) VALUES (?, ?)';
            db.run(query,[userId,annonceId],(err)=>{
                if(err){
                    console.error('Erreur: addPanier');
                    throw err;
                }
                console.log('ajout dans le panier');
                res.redirect(`/annonce/${annonceId}`);
            });
        }      
    })    
}

function deletePanierItem(req,res){
    const annonceId = req.params.id;
    const userId = req.session.userId;
    let query = 'DELETE FROM paniers WHERE userId=? AND annonceId=?';
    db.run(query,[userId,annonceId],(err)=>{
        if(err){
            console.error('Erreur: addPanier verif');
            throw err;
        }
        console.log('retrait de l\'annonce');
    })
    res.redirect(303,`/annonce/${annonceId}`);
}
function deleteFromPanier(req,res){
    const annonceId = req.params.id;
    const userId = req.session.userId;
    let query = 'DELETE FROM paniers WHERE userId=? AND annonceId=?';
    db.run(query,[userId,annonceId],(err)=>{
        if(err){
            console.error('Erreur: addPanier verif');
            throw err;
        }
        console.log('retrait de l\'annonce');
        showPanier(req,res);
    })
}

module.exports = {showPanier,addPanier,deletePanierItem,deleteFromPanier};