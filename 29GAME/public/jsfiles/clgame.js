$(document).ready(function()
{
    //note1 make first card as constant.
    //note2 make trup set.
    const socket=io();
    var user = prompt("enter username");
    categories=["C","H","D","S"];
    var catl;
    function setUser()
    {
        socket.emit("setUsername",user);
    }
    setUser();
    socket.on("re",function(data){
        user = prompt("enter username again");
        setUser();
    });
    function setCat(cati)
    {
        catl=cati;
    }
        function getCat()
    {
        return categories[catl];
    }
    
    var player;
    var num=0;
    



    /////////////////////////////////
   socket.on("user",function(data)
   {

num = data.player;
console.log("num : "+num);
player=data.user;
$('#username').html(player.username);
console.log(player);

//program        
priority=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
categories=["C","H","D","S"];
var i=0,max=0;

var cate;
l=num;
for(let j=0;j<4;j++)
{
for(let i=0;i<player[categories[j]]['A'].length;i++)
    {
    $('#pl'+0).append("<button id="+"'"+categories[j]+
    player[categories[j]]['A'][i]+"'"+" class='optionb"+l+" cards'"+
    "value ='"+categories[j]+" "+player[categories[j]]['A'][i]+"'>"+
    "<img class ='cardsimg' src='Images/"+player[categories[j]]['A'][i]+categories[j]+".jpg' alt='"+
    categories[j]+" "+player[categories[j]]['A'][i]+"'>"+"</button>");
   let s='#'+categories[j]+player[categories[j]]['A'][i];
   var it=0;
        
   $('.optionb'+num).attr('disabled',true);
    if(player.prewin==true)
    {
    $('.optionb'+num).attr('disabled',false);
    }

     $(s).click(function()
     {   let pl=l;
         let cat =j;
         let inte =i;
         
         
        if(player['prewin']==true)
         {
              setCat(cat);
        }
         player[categories[cat]]['counter']++;
         if(categories[cat]==getCat())
         pt=priority.indexOf(player[getCat()]['A'][inte]);
         else
         pt=-1;
         $(s).css('display','none');
         $('.optionb'+pl).attr('disabled',true);
        
         socket.emit("cardsent",{player:player,pt:pt,card:getCat(),playercard:player[categories[j]]['A'][i]+categories[j]})
     });
     
    }
}
function interval(){
    var bid =prompt("Enter your bid (more than 2)");
    while(bid<2||bid>13)
    bid =prompt("Enter your bid (more than 2)");
    player.bid=parseInt(bid);
    //console.log(player)
    socket.emit('setbid',{bid:bid,num:num});
}
setTimeout(interval,1000);

});
/////////
socket.on("nuser",function(data){
    u=data.names;
    
    switch(num){
        case (0):
            $("#north span").html(u[2]);
            $("#west span").html(u[3]);
            $("#east span").html(u[1]);
            break;
        case (1):
                $("#north span").html(u[3]);
                $("#west span").html(u[0]);
            $("#east span").html(u[2]);
            break;
        case (2):
                $("#north span").html(u[0]);
                $("#west span").html(u[1]);
            $("#east span").html(u[3]);
            break;
        case (3):
                $("#north span").html(u[1]);
                $("#west span").html(u[2]);
            $("#east span").html(u[0]);
            break;
        }
});
////////////
socket.on("c",function(data){
//console.log("reached c");
if(data.i2==0)
{
   for(let i2=0;i2<4;i2++)
   $("#pla"+i2).html("");
}

switch(num){
case ((data.i)%4):
    $("#pla"+0).html("<img  id='p"+0+"'"+" class='cardsimg'/>");
    $('#pla'+0).css('z-index',data.i2);
    $('#p'+0).attr('src','/Images/'+data.card+".jpg");
    break;
case (data.i+1)%4:
    $("#pla"+1).html("<img  id='p"+1+"'"+" class='cardsimg'/>");
    $('#pla'+1).css('z-index',data.i2);
    $('#p'+1).attr('src','/Images/'+data.card+".jpg");
    break;
case (data.i+2)%4:
    $("#pla"+2).html("<img  id='p"+2+"'"+" class='cardsimg'/>");
    $('#pla'+2).css('z-index',data.i2);
    $('#p'+2).attr('src','/Images/'+data.card+".jpg");
    break;
case (data.i+3)%4:
    $("#pla"+3).html("<img  id='p"+3+"'"+" class='cardsimg'/>");
    $('#pla'+3).css('z-index',data.i2);
    $('#p'+3).attr('src','/Images/'+data.card+".jpg");
    break;
}
});
/////////////
socket.on("hey",function(data){
//console.log(data.card);
//console.log(data.msg);
setCat(categories.indexOf(data.card));
if(player[data.card]['A'].length!=player[data.card].counter)
{
//console.log("inside if");
for(let i=0;i<player[data.card]['A'].length;i++)
{
$('#'+data.card+player[data.card]['A'][i]).attr('disabled',false);
}
}
else
{
//console.log("inside else");
$('.optionb'+data.pl).attr('disabled',false);
}

});
socket.on("winner",function(data){

if(player.username==data.winner)
{
$("img").load(function(){
    alert("you are the winner");
});
player.points++;
player.prewin=true;
$('.optionb'+data.pl).attr('disabled',false);
}
else
console.log("winner is : "+data.winner);
//
});

socket.on("result",function(data)
{

    
    let d=[];
    for(let i=0;i<4;i++)
    {
        //console.log(data.players[i]);
        let bid=data.players[i].bid;
        let points=data.players[i].points;
        if(points>=bid)
        {
            data.players[i].total=data.players[i].bid*10+(points-bid);
        }
        else
        {
            data.players[i].total=-data.players[i].bid*10;
        }
        //d.push(data.players[i]);
        d.push({name:data.players[i].username,total:data.players[i].total,id:data.players[i].id});
        console.log("di : ",d[i]);
    }
    //window.opener.confirm = window.confirm;

    //alert(d[0].name+"\n"+d[1].name+"\n"+d[2]+"\n"+d[3]);
    var r =confirm("play again!!!");
    if(r==true)
    {
     socket.emit("again",{pdata:d,num:num});
        
    }
    else{
        socket.emit("disbandindingAll");
    }

});
function reloadPage(){
    location.reload(true);
}
socket.on("restart",function(){
    reloadPage();
});

});