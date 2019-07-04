const mongoose=require("mongoose");

mongoose.set('useFindAndModify', false);

var commentSchema = new mongoose.Schema({
    writtenBy:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    },
    body:String,
    created:{type:Date,default:Date.now}
});

module.exports=mongoose.model("comment",commentSchema);

//mongoose.connect("mongodb://localhost/mysong",{useNewUrlParser:true});