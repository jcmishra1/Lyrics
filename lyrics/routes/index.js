var express = require("express"),
router = express.Router(),
passport=require("passport"),
user=require("../models/user")
ly=require("../models/lyrics"),
comments=require("../models/comments");

router.get('/',function(req,res){
    res.redirect("/blogs");
});

//sign up logic
router.get("/register",function(req,res){
    res.render("register");
});

//handel signup
router.post("/register",function(req,res){
    var newUser=new user({username:req.body.username})
    user.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","WELCOME "+user.username);
            res.redirect("/blogs");
        });

    });
});
//
router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login",passport.authenticate("local",
        {
            successRedirect:"/blogs",
            failureRedirect:"/login"

        }),function(req,res){});


router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","you were logged out");
    res.redirect('/blogs');
});

module.exports = router;