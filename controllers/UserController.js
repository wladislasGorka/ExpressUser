const User = require("../models/User");
const userView = require("../views/UserView");

function getUser(req, res){
    const user = new User(1,"Wladislas");
    res.end (userView(user));
}

module.exports=getUser;