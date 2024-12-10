const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');

// Routes
const registerRoutes = require('./routes/registerRoutes');
const logRoutes = require('./routes/logRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


// View engine
app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}))

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
    next();
});

// HOME
app.get("/", (req,res)=>{
    //res.send('Hello');
    res.render('index', {title: 'Home', loggedIn: req.session.loggedIn});
})

app.use('/', logRoutes)
app.use('/user',userRoutes)
app.use('/register',registerRoutes)
app.use('/admin',adminRoutes)

app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
})

// Listen
app.listen(port,()=>{
    console.log("Listen to http://localhost:3000");
})