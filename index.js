const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

// Routes
const homeController = require('./controllers/HomeController');
const registerRoutes = require('./routes/registerRoutes');
const logRoutes = require('./routes/logRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const annonceRoutes = require('./routes/annonceRoutes')
const panierRoutes = require('./routes/panierRoutes')

app.use(express.urlencoded({extended:true}))

// View engine
app.set('view engine','ejs');
app.use(express.static('public'));

// Session config
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

// get username in all template
app.use(function(req, res, next) {
    res.locals.userId = req.session.userId;
    res.locals.userName = req.session.userName;
    res.locals.role = req.session.role;
    next();
});

// HOME
app.get("/", homeController.showAnnonces)
//res.render('index', {title: 'Home', loggedIn: req.session.loggedIn});

app.use('/', logRoutes)
app.use('/user',userRoutes)
app.use('/register',registerRoutes)
app.use('/admin',adminRoutes)
app.use('/annonce',annonceRoutes)
app.use('/panier',panierRoutes)

app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
})

// Listen
app.listen(port,()=>{
    console.log("Listen to http://localhost:3000");
})