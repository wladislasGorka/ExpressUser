const db = require("../db/db");
const bcrypt = require("bcrypt");

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

module.exports = {showLogin,traiteLogin,traiteLogout};