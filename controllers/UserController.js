const User = require("../models/User");
const Annonce = require("../models/Annonce");
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

function showAnnoncesView(req, res){
    const userName = req.session.userName;
    const query = "SELECT * FROM annonces WHERE userName=?";
    db.all(query,[userName],(err,rows) => {
        if(err){
            console.error('Erreur: showAnnoncesView request');
            throw err;
        }
        if(rows){
            res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, action: 'view', result: true, datas: rows});
        }else{
            res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, action: 'view', result: false});
        }
    });
    
}

function createAnnoncesView(req, res){
    res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, action: 'create'});
}

function deleteAnnoncesView(req, res){
    res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, action: 'delete'});
}

function createAnnonces(req, res){
    const {title,price,category,description} = req.body;
    const userName = req.session.userName;
    const dateCreation = new Date();
    const newAnnonce = new Annonce(userName,title,price,category,description,dateCreation);
    const query = "INSERT INTO annonces (userName,title,price,category,description,dateCreation,dateEnd,visibility) VALUES (?,?,?,?,?,?,?,?)";
    db.run(query,[newAnnonce.userName,newAnnonce.title,newAnnonce.price,newAnnonce.category,newAnnonce.description,newAnnonce.dateCreation,newAnnonce.dateEnd,newAnnonce.visibility],
        (err) =>{
            if(err){
                console.error('création annonce échoué: ',err.message);
                throw err;
            }
            console.log('création d\'annonce');
            res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, action: 'create', result: true});
        }
    );
}

module.exports={showUser,showAnnoncesView,createAnnoncesView,deleteAnnoncesView,createAnnonces};