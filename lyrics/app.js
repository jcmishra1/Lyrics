
const express = require('express'),
       bodyParser= require("body-parser"),
       mongoose=require("mongoose"),
       passport=require("passport"),
       localStrategy=require("passport-local"),
       methodOverride=require("method-override"),
       user=require("./models/user")
       ly=require("./models/lyrics"),
       comments=require("./models/comments"),
       lyricsRoute=require("./routes/lyrics"),
       indexRoute=require("./routes/index"),
       commentsRoute=require("./routes/comments"),
       flash=require("connect-flash")
       seedDB=require("./seeds");

       var uri="mongodb+srv://jag2:jag2@cluster0-q8th7.mongodb.net/songLyrics"
       mongoose.connect(uri,{useNewUrlParser:true});
       

    //mongoose.connect("mongodb://localhost/songLyrics",{useNewUrlParser:true});


 app=express();
 app.set("view engine","ejs");
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true})); 
 app.use(methodOverride("_method"));
 //seedDB();//seed dataBase

 app.use(require("express-session")(
      {
         secret :"j",
         resave:false,
         saveUninitialized:false
      }
 ));
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(flash());
 app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
 });
 



 passport.use(new localStrategy(user.authenticate()));
 passport.serializeUser(user.serializeUser());
 passport.deserializeUser(user.deserializeUser());



 app.use("/blogs",lyricsRoute);
 app.use(indexRoute);
 app.use("/blogs/:id/comments",commentsRoute);

 app.get('/admin',function(req,res){
   res.render('loginpage.ejs');
});

 app.listen(3000,()=> {
    console.log("connected to port 3000....");
 });