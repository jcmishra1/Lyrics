var ly=require("../models/lyrics"),
    comments=require("../models/comments");

var middlewareObj={};

middlewareObj.checkLyricsOwnership = function(req , res, next){
        if(req.isAuthenticated()){
            ly.findById(req.params.id,function(err,foundLyrics){
                if(err)
                {
                    req.flash("error","Song lyrics not found..");
                    res.redirect('back');
                }
                else{
                    if(foundLyrics.writtenBy.id.equals(req.user.id)){
                       next();
                    }
                    else{
                        req.flash("error","You dont have the permission to do that..");
                        res.redirect("back");
                    }
                }
            });
        }
        else{
            
            
            req.flash("error","You need to be logged in to do that..");
            //console.log(req.flash("error"));
            res.redirect("/login");
        }
    }
middlewareObj.checkCommentOwnership=function(req , res, next){
    if(req.isAuthenticated()){
        comments.findById(req.params.comment_id,function(err,foundComment){
            if(err)
            {
            
            res.redirect('back');
            }
            else{
                if(foundComment.writtenBy.id.equals(req.user.id)){
                   next();
                }
                else{
                    req.flash("error","You dont have the permission to do that..");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","You need to be logged in to do that..");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req, res , next)
{
        if(req.isAuthenticated())
        {
           return next();
        }
        req.flash("error","you must be logged in");
        res.redirect("/login");
}

module.exports =middlewareObj;