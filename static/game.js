var socket = io();
socket.on('connect', function(data) {
  //here we will ask if join or create room
    //might not need this socket.emit('firstJoin', 'Hello World from client');

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

socket.on('hi',function(input){
  //this does work
  console.log("you have joined" + input +"test");
});
socket.on('entergame',function(){
//handle clearing things out for the game
var myNode = document.getElementById("buttons");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}
});
