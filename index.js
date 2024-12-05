const express = require('express');
const {getUser,showLogin,traiteLogin,showRegister,traiteRegister,showUser} = require('./controllers/UserController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req,res)=>{
    res.send('Hello');
})

app.get("/user", (req,res)=>{
    getUser(req,res);
})
app.get("/user/:id", showUser)


app.get("/login", showLogin)

app.post("/login", traiteLogin)

app.get("/register", showRegister)

app.post("/register", traiteRegister)

app.listen(port,()=>{
    console.log("Message à la con");
})