const User = require("../models/User");
const db = require("../db/db");
const bcrypt = require("bcrypt");

function showRegister(req, res){
    //res.send(registerView());
    res.render('RegisterView', {title: 'Register',loggedIn: req.session.loggedIn});
}

function traiteRegister(req, res){
    const {nom,password} = req.body;
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
            const newUser = new User(nom,hashedPassword);
            //console.log(newUser);
            const query = 'INSERT INTO users (username,password) VALUES (?, ?)';
            db.run(query,[newUser.name,newUser.password], 
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

module.exports = {showRegister,traiteRegister};