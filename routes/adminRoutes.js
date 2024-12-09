const express = require('express');
const {showAdmin,showUsers,showAdmins,showALL, roleUpdate, userDelete} = require('../controllers/AdminController');

const router = express.Router();

router.get("/", (req,res)=>{
    if(req.session.loggedIn){
        res.redirect(`/admin/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})
router.get("/:id", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showAdmin(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/admin/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/users", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showUsers(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/admin/${req.session.userId}/users`);
    }else{
        res.redirect('/login');
    }
})
router.get("/:id/admins", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showAdmins(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/admin/${req.session.userId}/admins`);
    }else{
        res.redirect('/login');
    }
})
router.post("/:id/admins", (req, res) => {
    //console.log("requetPost")
 if (req.session.loggedIn) {
        roleUpdate(req, res);
        //res.redirect(`/admin/${req.session.userId}/admins`);
        
    }else{
        res.redirect('/login');
    }
})
router.post("/:id/users", (req, res) => {
    //console.log("requetPost")
 if (req.session.loggedIn) {
        roleUpdate(req, res);
        //res.redirect(`/admin/${req.session.userId}/admins`);
        
    }else{
        res.redirect('/login');
    }
})
router.get("/:id/delete", (req,res)=>{
 if(req.session.loggedIn){
       showALL(req,res);
    }else{
        res.redirect('/login');
    }
})

router.post("/:id/delete", (req, res) => {
    //console.log("requetPost")
 if (req.session.loggedIn) {
        userDelete(req, res);
        //res.redirect(`/admin/${req.session.userId}/admins`);
        
    }else{
        res.redirect('/login');
    }
})
module.exports = router;