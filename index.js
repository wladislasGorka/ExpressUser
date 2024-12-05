const express = require('express');
const {showLogin,traiteLogin,showRegister,traiteRegister,showUser,traiteLogout} = require('./controllers/UserController');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret: 'secret_de_session',
    name:'uniqueSessionID',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use((req, res, next) => {
    if (!req.session) {
        return next(new Error('Session non initialisée'));
    }
    next();
});

app.get("/", (req,res)=>{
    //res.send('Hello');
    res.render('index', {title: 'Home', loggedIn: req.session.loggedIn});
})

app.get("/user", (req,res)=>{
    if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})
app.get("/user/:id", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showUser(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})


app.get("/login", showLogin)

app.post("/login", traiteLogin)

app.get("/register", showRegister)

app.post("/register", traiteRegister)

app.get("/logout", traiteLogout)

app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
})

app.listen(port,()=>{
    console.log("Listen to http://localhost:3000");
})