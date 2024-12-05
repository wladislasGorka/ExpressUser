const express = require('express');
const {getUser,showLogin,traiteLogin,showRegister,traiteRegister,showUser} = require('./controllers/UserController');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    //res.send('Hello');
    res.render('index', {title: 'Home'});
})

app.get("/user", (req,res)=>{
    getUser(req,res);
})
app.get("/user/:id", showUser)


app.get("/login", showLogin)

app.post("/login", traiteLogin)

app.get("/register", showRegister)

app.post("/register", traiteRegister)

app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
})

app.listen(port,()=>{
    console.log("Listen to http://localhost:3000");
})