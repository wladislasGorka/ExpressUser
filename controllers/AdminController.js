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
function showALL(req,res){
    const query = 'SELECT * FROM users';
    db.all(query, [], function (err, rows) {
        if (err) {
            throw err;
        }
        // rows contient toutes les lignes de la table users
        //console.log(rows);
        res.render('AdminView', {title: 'Admin', loggedIn: req.session.loggedIn, action: 'deleteUser', datas: rows});
    });
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

function roleUpdate(req, res) {
    const user = req.body.username;
    const role = req.body[user];
   // console.log(role + " test");
    const query = 'UPDATE users SET role = ? WHERE username = ? ';
    db.run(query, [role, user], (err) => {
        if (err) {
            throw err;
        }
        if (role == "ROLE_ADMIN") {
           showUsers(req, res);
        }
        else {
           showAdmins(req, res)  ;
            
        }
    } ) 
}
function userDelete(req, res) {
    const user = req.body.username;
    const query = 'DELETE FROM users WHERE username = ?';
    db.run(query, [user], (err) => {
        if (err) {
            throw err;
        }
        showALL(req, res);
    } )
}


module.exports = { showAdmin, showUsers, showAdmins, roleUpdate,showALL,userDelete };

