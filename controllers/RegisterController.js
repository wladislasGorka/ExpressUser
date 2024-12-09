const User = require("../models/User");
const db = require("../db/db");
const bcrypt = require("bcrypt");

function showRegister(req, res){
    //res.send(registerView());
    res.render('RegisterView', {title: 'Register',loggedIn: req.session.loggedIn});
}

function traiteRegister(req, res){
    const {nom,password} = req.body;
    // Verification nom utilisateur
    const query = 'SELECT * FROM users WHERE username=?';
    db.get(query,[nom],function (err,row){
        if(err){
            console.error('Erreur showUser');
            res.send('ERROR');
        }
        if(row){
            res.render('RegisterView', {title: 'Login',loggedIn: req.session.loggedIn, messageError: 'Erreur connexion: username déjà utilisé'});
        }else{
            // Hash
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.error('Erreur de génération du sel:', err.message);
                    res.send("ERROR");
                    return;
                }
                // Hacher le mot de passe
                bcrypt.hash(password, salt, (err, hashedPassword) => {
                    if (err) {
                        console.error('Erreur de hachage:', err.message);
                        res.send("ERROR");
                        return;
                    }
                    const newUser = new User(nom,hashedPassword,'ROLE_USER');
                    //console.log(newUser);
                    const query = 'INSERT INTO users (username,password,role) VALUES (?, ?, ?)';
                    db.run(query,[newUser.name,newUser.password,newUser.role], 
                        function (err){
                            if(err){
                                console.error('register échoué: ',err.message);
                                res.send("ERROR");
                            }else{
                                console.log("user creation: ",newUser);
                                res.redirect(`/login`);
                            }
                        }
                    )
                })
            })
        }        
    })
}

module.exports = {showRegister,traiteRegister};