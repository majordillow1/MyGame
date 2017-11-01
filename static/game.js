var socket = io();
socket.on('connect', function(data) {
  //here we will ask if join or create room
    //might not need this socket.emit('firstJoin', 'Hello World from client');

});
function createGame(){
  document.getElementById("startbutton1").style.display = "none";
  document.getElementById("startbutton2").style.display = "none";
  socket.emit('createGame');

}
function JoinGame(){
  document.getElementById("startbutton1").style.display = "none";
  document.getElementById("startbutton2").style.display = "none";
  socket.emit('JoinLobby');

}
