var    mongoose=require("mongoose"),
       ly=require("./models/lyrics"),
       comments=require("./models/comments"),
       lyricsRoute=require("./routes/lyrics"),
       indexRoute=require("./routes/index"),
       commentsRoute=require("./routes/comments")

var data=
    [
        {
        writtenBy:"jag",
        title:"jhsdggsgsgdfhsdhfgshdgfhsgfs",
        lyrics:"fadskfjaksdjfkjdskdjfajsdfas",
        },
        {
            writtenBy:"jag23",
            title:"jhsdggsgsgd1212121212",
            lyrics:"fadskfjaksdjfkjdskdjfajsdfas2121212121212121",
        },
        {
            writtenBy:"jag1234",
            title:"jhsdhsdhfsa232323",
            lyrics:"fadskfjaksdjfk23232323jdskdjfajsdfas",
            }
    ];


function seedDB(){
    ly.remove({},(err)=>{
        if(err)
        console.log(err);
        console.log("Removed lyrics");
        create
    data.forEach(seed=>{
        ly.create(seed,(err,lyric)=>{
            if(err)
                console.log(err);
            else
            {
                console.log("lyrics created");
                //comments
                comments.create({
                    writtenBy:"um1",
                    title:"not good",
                    body:"ksdhfjkhjasfgasdhfashdgfahsdjfa"},(err,comment)=>{
                        if(err)
                        console.log(err);
                        else{
                        lyric.comments.push(comment);
                        lyric.save();
                        console.log("created new comment"); 
                        }

                    });
            }
        });
    });
});



}
module.exports= seedDB;
