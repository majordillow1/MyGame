var socket = io('/room');
socket.on('connect', function(data) {
  //here we will ask if join or create room
    //might not need this socket.emit('firstJoin', 'Hello World from client');
console.log("joined namespace");
});
