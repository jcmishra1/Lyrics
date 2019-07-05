$(document).ready(function()
{
    var socket=io();
    var user = prompt("enter username");
    categories=["C","H","D","S"];
    var catl;
    function setUser()
    {
        socket.emit("setUsername",user);
    }
    function setCat(cati)
    {
        catl=cati;
    }
        function getCat()
    {
        return categories[catl];
    }
    setUser();
    var player;
    var num=0;
   socket.on("user",function(data)
   {
$('#username').html(data.username);
num = data.player;
console.log("num : "+num);
player=data.playerCards;
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

});
socket.on("c",function(data){
//console.log("reached c");
if(data.i==0)
{
   for(let i=0;i<4;i++)
   $('#p'+i).attr('src','');
}
// $('#table').html("");
$('#p'+data.i).attr('src','/Images/'+data.card+".jpg");
});

socket.on("hey",function(data){
console.log(data.card);
console.log(data.msg);
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
alert("you are the winner");
player.prewin=true;
$('.optionb'+data.pl).attr('disabled',false);
}
else
console.log("winner is : "+data.winner);
//
});

});