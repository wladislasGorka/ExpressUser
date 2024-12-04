const express = require('express');
const getUser = require('./controllers/UserController');

const app = express();
const port = 3000;

app.get("/", (req,res)=>{
    res.send('Hello');
})

app.get("/user", (req,res)=>{
    //res.send('Hello');
    getUser(req,res);
})

app.listen(port,()=>{
    console.log("Message à la con");
    console.log(getUser);
})