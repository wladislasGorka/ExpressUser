const User = require("../models/User");
const db = require("../db/db");

function showUser(req, res){
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id=?';
    db.get(query,[userId],function (err,row){
        if(err){
            console.error('Erreur showUser');
            res.send('ERROR');
        }else{
            if(row){
                const user= new User(row.username,row.password);
                res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, user: user});
            }else{
                console.error('User introuvable');
                res.send('ERROR');
            }
        }
    })    
}

function showAnnonces(req, res){
    res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, action: 'view'});
}

function createAnnonces(req, res){
    res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, action: 'create'});
}

function deleteAnnonces(req, res){
    res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, action: 'delete'});
}

module.exports={showUser,showAnnonces,createAnnonces,deleteAnnonces};