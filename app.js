var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.get('/',function(req,res,next){
  res.sendFile(__dirname+'/index.html');
});
app.get('/room',function(req,res,next){
  res.sendFile(__dirname+'/test.html');
});
app.use('/static', express.static(__dirname + '/static'));
server.listen(process.env.PORT || 5000, function(){
  console.log("app listening on port");
});



var games = [];
setInterval(
  function(){

    for(var i = 0;i<games.length;i++){
      //use this to send messages to players in rooms
      //io.sockets.in('room' + games[i].id).emit('hi', games[i].id);

      var clients = io.sockets.adapter.rooms['room'+games[i].id];

      if(clients == null){

        games.splice(i,1);
        console.log("removing game");
      }

    }
 },
 3000);




io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('firstJoin', function(data) {
        console.log(data);
    });
    client.on('disconnect',function(){
      console.log("client disconnected");
    });
    client.on('createGame',function(g){
    games.push(g);

      console.log("client host game " + g.id);


    });
    client.on('JoinLobby',function(){
      console.log("loadlobby");
    client.emit('gamess', games);
    });
    client.on('join game',function(s){
      //let socket know they joined here
      client.join('room' + s);
      console.log("joined certain game" + s);
      client.emit('entergame');
    });
    client.on('addPlayerList',function(room){
      //emit to update the player room list
      let rooms = Object.keys(client.rooms)[1];
     // [ <socket.id>, 'room 237' ]
      console.log("your room sir " + rooms);
      io.sockets.in(rooms).emit('addToPlayalist',room);
    });


});
//need to add dynamic array. I will be an array of arrays
//make an array that for each room holds an array
//when a game is made it adds an arry to the array
//when removed it removes it's array
//add to the array and update server list everytim.
