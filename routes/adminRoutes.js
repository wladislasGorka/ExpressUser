const express = require('express');
const {showAdmin} = require('../controllers/AdminController');

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

module.exports = router;