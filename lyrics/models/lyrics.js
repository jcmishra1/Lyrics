const mongoose=require("mongoose");

mongoose.set('useFindAndModify', false);

var lySchema = new mongoose.Schema({
    //wrttenBy:String,
    writtenBy:{
        id:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        username:String
    },
    title:String,
    lyrics:String,
    comments:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"comment"
                }
            ],
    created:{
                type:Date,
                default:Date.now
            }
});

module.exports=mongoose.model("lyrics",lySchema);


