const User = require("../models/User");
const userView = require("../views/UserView");
const loginView = require("../views/LoginView");
const registerView = require("../views/RegisterView");
const db = require("../db/db");
const bcrypt = require("bcrypt");

function getUser(req, res){
    const user = new User(1,"Wladislas");
    res.end (userView(user));
}

function showLogin(req, res){
    res.send(loginView());
}

function traiteLogin(req, res){
    console.log(req.body);
    const {nom,password} = req.body;
    const query = 'SELECT * FROM users WHERE username=?';
    db.get(query,[nom], 
        function (err,row){
            if(err){
                console.error('login échoué: ',err.message);
                res.send("ERROR");
            }else{
                if(row){
                    bcrypt.compare(password,row.password, (err,result)=>{
                        if (err) {
                            console.error('Erreur de comparaison:', err.message);
                            res.send("ERROR");
                        } else if (result) {
                            console.log('Connexion réussie:', row);
                            res.send("SUCCESS LOGIN");
                        } else {
                            console.log('Mot de passe incorrect');
                            res.send("Mot de passe incorrect");
                        }
                    })
                }else{
                    console.log(row);
                    res.send("Register fisrt");
                }                
            }
        }
    )
}

function showRegister(req, res){
    res.send(registerView());
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
                        console.log("user access: ",newUser);
                        res.send("SUCCESS");
                    }
                }
            )
        })
    })
}


module.exports={getUser,showLogin,traiteLogin,showRegister,traiteRegister};