var express = require("express"),
    router = express.Router(),
    ly=require("../models/lyrics"),
    middleware=require("../middleware");

 
//index
router.get('/',function(req,res){
     ly.find({},(err,lyrics)=>{
         if(err)
         throw err;
         else
        res.render('lyrics',{lyrics:lyrics});
     });
      
    });
   

//new
router.get('/new',middleware.isLoggedIn,function(req,res){
    res.render('lyrics/newLyrics');
});

//create
router.post("/",middleware.isLoggedIn,function(req,res){
    //create blog
    var title=req.body.ly.title;
    var lyrics=req.body.ly.lyrics;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newLyrics={title:title,lyrics:lyrics,writtenBy:author}
    ly.create(newLyrics ,(err,newBlog)=>{
       if(err) res.render('lyrics/newLyrics');
       //redirect to index
       else{
           //console.log(newBlog);
       res.redirect('/blogs'); 
       }
    });
});

//show 
router.get("/:id",function(req,res){
   ly.findById(req.params.id).populate("comments").exec(function(err,foundLyrics){
    if(err) res.redirect('/blogs');
      //console.log(foundLyrics);
       res.render('lyrics/showLyrics',{lyrics:foundLyrics});
   });
});

//edit
router.get("/:id/edit",middleware.checkLyricsOwnership,function(req,res){
    
        ly.findById(req.params.id,function(err,foundLyrics)
        {
         res.render('lyrics/editLyrics',{lyrics:foundLyrics});
        });
   
});

//update
router.put('/:id',middleware.checkLyricsOwnership,function(req,res){
   ly.findByIdAndUpdate(req.params.id, req.body.ly, function(err, updatedBlog){
       if(err)
       res.redirect('/blogs');
       res.redirect('/blogs/'+req.params.id);
   });
});

//delete
router.delete("/:id",middleware.checkLyricsOwnership,function(req,res){
    //destroy blog
    ly.findByIdAndRemove(req.params.id,function(err){
        if(err) res.redirect("/blogs");
        res.redirect("/blogs");
    });
});



 module.exports = router;