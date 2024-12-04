const User = require("../models/User");
const userView = require("../views/UserView");
const loginView = require("../views/LoginView");

function getUser(req, res){
    const user = new User(1,"Wladislas");
    res.end (userView(user));
}

function showLogin(req, res){
    res.send(loginView());
}

module.exports={getUser,showLogin};