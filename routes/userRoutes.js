const express = require('express');
const router = express.Router();
const {showUser,showAnnoncesView,createAnnoncesView,deleteAnnoncesView,createAnnonces} = require('../controllers/UserController');

router.get("/", (req,res)=>{
    if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})
router.get("/:id", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showUser(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/view", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showAnnoncesView(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/view`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/create", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        createAnnoncesView(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/create`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/delete", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        deleteAnnoncesView(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/delete`);
    }else{
        res.redirect('/login');
    }
})

router.post("/:id/create", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        createAnnonces(req,res);
    }else if(req.session.loggedIn){
        res.redirect(307,`/user/${req.session.userId}/create`);
    }else{
        res.redirect('/login');
    }
})

module.exports = router;