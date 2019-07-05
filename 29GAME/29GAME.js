const express=require('express'),
    app =express(),
    server=app.listen(process.env.PORT||5000,process.env.IP,function()
    {
        console.log("connected to server 5000...");
    });
    io=require('socket.io').listen(server);

var  g=require('./gamed.js');
app.set('view engine','ejs');

app.use('/Images',express.static('public/Images'));
app.use('/jsfiles',express.static('public/jsfiles'));


users=[];
usernames=[];
var pla=0;
var max=0;
var pli=0;
var li=0;
var card;
var i=0,turn=0,t=0,num=0;
var roomno = 0;

app.get('/',function(req,res){
    res.render('game');
});
// app.get('/result',function(req,res){
//     res.render('result');
// });

//distribute cards
g.dic();
io.on('connection',function(socket){
       //Increase roomno 2 clients are present in a room.
//    if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 3) roomno++;
//    socket.join("room-"+roomno);

//    //Send this event to everyone in the room.
//    io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
    
    socket.join('game');
    priority=[];
   
    socket.on("setUsername",function(data){
       if(usernames.indexOf(data)>=0)
       {
            socket.emit("re");
       }
       else{
        console.log("hi "+data);
        usernames.push(data);
        g.playerCards(pla).username=data;
        g.playerCards(pla).id=socket.id;
        users.push(g.playerCards(pla));
        users[t].prewin=true;
        //console.log(users[pla]);
        pla++;
        
        socket.emit('user',{user:users[pla-1],player:pla-1});
        //socket.emit('user',{username:data,playerCards:g.playerCards(pla-1),player:pla-1});
        if(usernames.length==4)
        {
        io.sockets.to('game').emit("nuser",{names:usernames});
        //i=0;
        }
        if(pla==4)
        pla=0;
        i++;
    }
    });
    
    socket.on("setbid",function(data){
        users[data.num].bid=data.bid;
    });

    socket.on("cardsent",function(data)
    {
        if(users[pli].prewin==true)
         card=data.card;
        users[pli].prewin=false;
        //console.log("pla : "+pli+" pt "+data.pt);
        priority[pli]=data.pt;
        max=(priority[pli]>max)?priority[pli]:max;
        io.sockets.to('game').emit("c",{name:users[pli].username,card:data.playercard,i:pli,i2:li});
        
        plaa=data.card;
        li++;
        pli++;
        let winner;
        if(pli==4)
        {
            pli=0;
        }
        if(li==4)
        {  
            turn++;
            winner=priority.indexOf(max);
            users[winner].prewin=true;
            console.log(users[winner].username);
            users[winner].points++;
            max=0;
            pli=winner;
            li=0;
            io.sockets.to('game').emit("winner",{winner:users[winner].username,pl:pli,card:data.card,win:users[pli].prewin});
        }
        
        socket.broadcast.to(users[pli].id).emit('hey',{msg:"your turn",pl:pli,card:card});
        if(turn==13)
        {
            //users[pli][plaa].A.splice()
            i=0;
            for(let i=0;i<4;i++)
        {
            users[i].C.A.splice(0,users[i].C.A.length);
            users[i].S.A.splice(0,users[i].S.A.length);
            users[i].D.A.splice(0,users[i].D.A.length);
            users[i].H.A.splice(0,users[i].H.A.length);
            
        }
            turn=0;
            io.sockets.to('game').emit("result",{players:users});
        }
    });
    socket.on("again",function(data){
        //console.log(g.playerCards(data.num));
        if(i==0)
        {
        g.dic();
        i++;
    }
        
        for(let i=0;i<4;i++)
        {
            users[i].C=g.playerCards(i).C;
            users[i].D=g.playerCards(i).D;
            users[i].S=g.playerCards(i).S;
            users[i].H=g.playerCards(i).H;
            //console.log(users[i].C,' : ' ,g.playerCards(i).C);
            if(i==data.num)
            {
            console.log(g.playerCards(data.num));
            users[i].total=data.pdata[i].total;
            socket.emit('user',{user:users[i],player:i});
            }
            if(t+1==i)
            users[i].prewin=true;
            else
            users[i].prewin=false;
        }
       
    });
    socket.on("disbandingAll",function(){
        users=[];
        usernames=[];pla=0;
        max=0;pli=0;li=0;
        card;
        i=0,turn=0,t=0,num=0;
        roomno = 0;
        io.sockets.emit("restart");
        if(num==0)
        {
        g.dic();
        num++;
        }
        socket.emit("re");

    });
     socket.on('disconnect', function(){
        console.log('user disconnected');
        users=[];
        usernames=[];pla=0;
        max=0;pli=0;li=0;
        card;
        i=0,turn=0,t=0,num=0;
        roomno = 0;
        io.sockets.emit("restart");
        // if(num==0)
        // {
        // g.dic();
        // num++;
        // }
        //g.dic();
        socket.emit("re");
      });


});
