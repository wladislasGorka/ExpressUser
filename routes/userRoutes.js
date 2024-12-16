const express = require('express');
const router = express.Router();
const logMiddleware = require('../middlewares/LogMiddleware');

const {showUser,showAnnoncesView,createAnnoncesView,deleteAnnoncesView,createAnnonces} = require('../controllers/UserController');

router.get("/",logMiddleware, (req,res)=>{
    if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})
router.get("/:id",logMiddleware, (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showUser(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/view",logMiddleware, (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showAnnoncesView(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/view`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/create",logMiddleware, (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        createAnnoncesView(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/create`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/delete",logMiddleware, (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        deleteAnnoncesView(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/delete`);
    }else{
        res.redirect('/login');
    }
})

router.post("/:id/create",logMiddleware, (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        createAnnonces(req,res);
    }else if(req.session.loggedIn){
        res.redirect(307,`/user/${req.session.userId}/create`);
    }else{
        res.redirect('/login');
    }
})

module.exports = router;