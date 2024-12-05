const User = require("../models/User");
const userView = require("../views/UserView");
const loginView = require("../views/LoginView");
const registerView = require("../views/RegisterView");
const db = require("../db/db");

function getUser(req, res){
    const user = new User(1,"Wladislas");
    res.end (userView(user));
}

function showLogin(req, res){
    res.send(loginView());
}

function traiteLogin(req, res){
    console.log(req.body);
    console.log(req.cookies.users.name);
    const {nom,password} = req.body;
    if(nom==="admin" && password==="password"){
        res.send('Bienvenue');
    }else{
        res.send('Error');
    }
}

function showRegister(req, res){
    res.send(registerView());
}

function traiteRegister(req, res){
    const {nom,password} = req.body;
    const newUser = new User(nom,password);
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
}


module.exports={getUser,showLogin,traiteLogin,showRegister,traiteRegister};