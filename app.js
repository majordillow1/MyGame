var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.get('/',function(req,res,next){
  res.sendFile(__dirname+'/index.html');
});
app.use('/static', express.static(__dirname + '/static'));
server.listen(process.env.PORT || 5000, function(){
  console.log("app listening on port");
});
io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('firstJoin', function(data) {
        console.log(data);
    });
    client.on('disconnect',function(){
      console.log("client disconnected");
    });
    client.on('createGame',function(){
    
      console.log("client host game");

    });
    client.on('JoinLobby',function(){
      console.log("loadlobby");
    });

});
