
var express = require('express');
//var online = require('online');
//var redis = require('redis');
//var ss = require('socket.io-stream');
//var sio = require('socket.io');
//var db = redis.createClient();
var port = 1238 ;

//online = online(db);

var app = express();



//var https = require('https') ;
app.use(express.static('game'));

console.log("working fine")

app.listen(port, () => {console.log("Example app listening on port "+port);});
