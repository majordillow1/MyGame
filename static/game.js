var socket = io();
socket.on('connect', function(data) {
  //here we will ask if join or create room
    //might not need this socket.emit('firstJoin', 'Hello World from client');
console.log("did connect");
});

var games = [];
socket.on('gamess',function(gamearray){

  console.log("shouldve got something" + games);
  games = gamearray;
  console.log(games);
  var doc = document, docFrag = document.createDocumentFragment();
  for (var i = 0; i<games.length;i++){
       var elem = doc.createElement('input');
       elem.class = 'lobbybutton';
       elem.type = 'button';
       elem.value = games[i].id;
       elem.style = "display:list-item;";
       elem.onclick = function(){
         socket.emit('join game', games[0].id);
       };
       var divin = document.getElementById("buttons");
       divin.appendChild(elem);
       console.log("should add button");

  }
  doc.body.appendChild(docFrag);

});
function createGame(){
  document.getElementById("startbutton1").style.display = "none";
  document.getElementById("startbutton2").style.display = "none";
  var gameObject = {};
     gameObject.id = (Math.random()+1).toString(36).slice(2, 18);
     gameObject.playerOne = socket.id;
     gameObject.playerTwo = null;
     console.log("Game Created by "+ socket.id + " w/ " + gameObject.id);
  socket.emit('createGame',gameObject);
      socket.emit('join game', gameObject.id);

}
function JoinGame(soc){
  document.getElementById("startbutton1").style.display = "none";
  document.getElementById("startbutton2").style.display = "none";
  socket.emit('JoinLobby');

}
var username = "";
function setUsername(){
  username = document.getElementById("username").value;
  document.getElementById("usernamediv").style.display = "none";
  document.getElementById("chat").style.display = "inherit";
  socket.emit('addPlayerList',username);
}
var chat = "";
function sendChat(){
chat = document.getElementById("chatValue").value;
socket.emit('AddtoChat',chat);
}
socket.on('addClientChat',function(chatsin,usain){
  var para = document.createElement('p');
  var chattext = document.createTextNode(usain + ": " + chatsin);
  para.appendChild(chattext);
  document.getElementById('chat').appendChild(para);
});
socket.on('addToPlayalist',function(usaname){
  var myNode = document.getElementById("playerList");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  var userArray = usaname.split("--/");
  console.log("add " + userArray);
  for(var i in userArray){
  var playa =  document.createElement('p');
  var textnode = document.createTextNode(userArray[i]);         // Create a text node
playa.appendChild(textnode);

    document.getElementById('playerList').appendChild(playa);
  }
});
socket.on('RemovefromPlayaList',function(user){
console.log("remove "+user);
var myNode = document.getElementById("playerList");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

for(var i in user){
var playa =  document.createElement('p');
var textnode = document.createTextNode(user[i]);         // Create a text node
playa.appendChild(textnode);

  document.getElementById('playerList').appendChild(playa);
}

});
socket.on('entergame',function(){
//handle clearing things out for the game
var myNode = document.getElementById("buttons");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}
document.getElementById("usernamediv").style.display = "inherit";

});
