const User = require("../models/User");
const db = require("../db/db");
const bcrypt = require("bcrypt");

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

function showLogin(req, res){
    //res.send(loginView());
    //res.sendFile(path.join(__dirname, '../views/LoginView.html'));
    res.render('LoginView', {title: 'Login',loggedIn: req.session.loggedIn});
}

function traiteLogin(req, res){
    //console.log(req.body);
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
                            req.session.userId = row.id;
                            req.session.loggedIn = true;
                            res.locals.loggedIn = req.session.loggedIn;
                            //console.log(res.locals.loggedIn);
                            //console.log(req.session);
                            res.redirect(`/user`);
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

function traiteLogout(req, res){
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
              res.status(400).send('Unable to log out');
            } else {
              console.log('Logout successful');
              //res.render('index', {title: 'Home'});
              res.redirect(`/`);
            }
        });
    }
}


module.exports={showLogin,traiteLogin,showRegister,traiteRegister,showUser,traiteLogout};