var express = require("express"),
    router = express.Router({mergeParams:true}),
    ly=require("../models/lyrics"),
    comments=require("../models/comments"),
    middleware=require("../middleware");




router.get("/new",middleware.isLoggedIn,function(req,res){
    ly.findById(req.params.id,(err,foundLyrics)=>{
        if(err)
        res.redirect("back");
        else{
            res.render("comments/newComment",{lyrics:foundLyrics})
        }
    });
});

router.post('/',middleware.isLoggedIn,function(req,res){
    ly.findById(req.params.id,function(err,foundLyrics){
        if(err)
        {
            req.flash("error","something went wrong..")
            res.redirect("/lyrics");
        }
        else{
            comments.create(req.body.comment,function(err,comment){
                if(err)
                console.log(err);
                else{
                        comment.writtenBy.id=req.user._id;
                        comment.writtenBy.username=req.user.username;
                        comment.save();
                        foundLyrics.comments.push(comment);
                        foundLyrics.save();
                        req.flash("success","successfully added a comment");
                        res.redirect("/blogs/"+req.params.id);
                    }
                    
                });
            }
        });
});
//edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    comments.findById(req.params.comment_id,function(err,foundComment){
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.render("comments/editComment",{comment:foundComment,id:req.params.id});
        }
        
    })
    

})
//update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    
    
        comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,upcomment){
            if(err){
                res.redirect("back");
            }
            else{
            res.redirect("/blogs/"+req.params.id);
            }
        });
    
});
//destroy comment
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    comments.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        {
            res.redirect("back");
        }
        else{
            req.flash("success","Comment deleted");
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

module.exports = router;