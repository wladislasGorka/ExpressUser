const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Routes
const homeRoutes = require('./routes/homeRoutes');
const registerRoutes = require('./routes/registerRoutes');
const logRoutes = require('./routes/logRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const annonceRoutes = require('./routes/annonceRoutes');
const panierRoutes = require('./routes/panierRoutes');

//Middlewares
const logMiddleware = require('./middlewares/LogMiddleware');

app.use(express.urlencoded({extended:true}))

// View engine
app.set('view engine','ejs');
app.use(express.static('public'));

// Session config
app.use(session({
    genid: (req) => {return uuidv4()},
    secret: 'secret_de_session',
    name:'uniqueSessionID',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use((req, res, next) => {
    if (!req.session) {
        return next(new Error('Session non initialisée'));
    }
    next();
});

//cache
app.use((req,res,next)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
})

// get username in all template
app.use(function(req, res, next) {
    res.locals.userId = req.session.userId;
    res.locals.userName = req.session.userName;
    res.locals.role = req.session.role;
    next();
});


app.use("/home",homeRoutes)
app.use('/',logRoutes)
app.use('/user',logMiddleware,userRoutes)
app.use('/register',registerRoutes)
app.use('/admin',logMiddleware,adminRoutes)
app.use('/annonce',annonceRoutes)
app.use('/panier',logMiddleware,panierRoutes)

app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
})

// Listen
app.listen(port,()=>{
    console.log("Listen to http://localhost:3000");
})