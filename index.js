const express = require('express');
const {getUser,showLogin} = require('./controllers/UserController');

const app = express();
const port = 3000;

app.get("/", (req,res)=>{
    res.send('Hello');
})

app.get("/user", (req,res)=>{
    getUser(req,res);
})

app.get("/login", showLogin)

app.listen(port,()=>{
    console.log("Message à la con");
})