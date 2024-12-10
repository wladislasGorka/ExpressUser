const express = require('express');
const router = express.Router();
const {showUser,showAnnonces,createAnnonces,deleteAnnonces} = require('../controllers/UserController');

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
        showAnnonces(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/view`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/create", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        createAnnonces(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/create`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/delete", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        deleteAnnonces(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/delete`);
    }else{
        res.redirect('/login');
    }
})

module.exports = router;