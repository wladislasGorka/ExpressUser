const User = require("../models/User");
const db = require("../db/db");

function showAdmin(req, res){
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id=?';
    db.get(query,[userId],function (err,row){
        if(err){
            console.error('Erreur showUser');
            res.send('ERROR');
        }else{
            if(row){
                const user= new User(row.username,row.password);
                res.render('AdminView', {title: 'User', loggedIn: req.session.loggedIn, user: user});
            }else{
                console.error('User introuvable');
                res.send('ERROR');
            }
        }
    })
    
}

function showUsers(req,res){
    const query = 'SELECT * FROM users WHERE role="ROLE_USER"';
    db.all(query, [], function (err, rows) {
        if (err) {
            throw err;
        }
        // rows contient toutes les lignes de la table users
        //console.log(rows);
        res.render('AdminView', {title: 'Admin', loggedIn: req.session.loggedIn, action: 'gestionUsers', datas: rows});
    });
}
function showAdmins(req,res){
    const query = 'SELECT * FROM users WHERE role="ROLE_ADMIN"';
    db.all(query, [], function (err, rows) {
        if (err) {
            throw err;
        }
        // rows contient toutes les lignes de la table users
        //console.log(rows);
        res.render('AdminView', {title: 'Admin', loggedIn: req.session.loggedIn, action: 'gestionAdmins', datas: rows});
    });
}

module.exports={showAdmin,showUsers,showAdmins};