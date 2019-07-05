priority=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    categories=["C","H","D","S"];
    cards={   
        C:['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
        H:['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
        D:['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
        S:['2','3','4','5','6','7','8','9','10','J','Q','K','A']
    };
    var i=0,ctr=0,win=false;
    var bid=0,total=0;
    players = [];
    players[0]=
    {   
        C:{A:[],counter:ctr},
        H:{A:[],counter:ctr},
        D:{A:[],counter:ctr},
        S:{A:[],counter:ctr},
        prewin:win,
        points:i,
        bid:bid,
        total:total
    };
   
    players[1]=
    {   
        C:{A:[],counter:ctr},
        H:{A:[],counter:ctr},
        D:{A:[],counter:ctr},
        S:{A:[],counter:ctr},
        prewin:win,
        points:i,
        bid:bid,
        total:total
    };
    players[2]=
    {   
        C:{A:[],counter:ctr},
        H:{A:[],counter:ctr},
        D:{A:[],counter:ctr},
        S:{A:[],counter:ctr},
        prewin:win,
        points:i,
        bid:bid,
        total:total
    };
    players[3]=
    {   
        C:{A:[],counter:ctr},
        H:{A:[],counter:ctr},
        D:{A:[],counter:ctr},
        S:{A:[],counter:ctr},
        prewin:win,
        points:i,
        bid:bid,
        total:total
    };
   
    var player=0;
    var counter=0;
    function distcard(){
        
        for(counter=0;counter<52;counter++)
         {
        
        var i =Math.floor(Math.random()*(categories.length));
        //console.log(i);
        var j =Math.floor(Math.random()*(cards[categories[i]].length));
        // console.log(counter+" : "+cards[categories[i]]+" : "+j);
        players[player][categories[i]]['A'].push(cards[categories[i]][j]);
        cards[categories[i]].splice(j,1);
        if(cards[categories[i]].length==0)
        {
            categories.splice(i,1);
        }
        
         player++;
         if(player==4)
         {
         player=0;
        }
    }
        console.log("cards distribution finished");
        // console.log(players[0]);
        // console.log(players[1]);
        // console.log(players[2]);
        // console.log(players[3]);
        //return players;
    priority=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    categories=["C","H","D","S"];
    cards={   
        C:['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
        H:['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
        D:['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
        S:['2','3','4','5','6','7','8','9','10','J','Q','K','A']
    };
    };
    //distcard();
    exports.dic= ()=>{console.log("dic");
        distcard()};
    exports.playerCards= i => players[i];