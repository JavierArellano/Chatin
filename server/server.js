//para ejecutar el server en cmd: nodemon server/server.js

// importado de libreria express
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var dl = require("delivery");
var fl = require("fs");

app.use(express.static("public"));
//peticiones
//app.get('/', function(peti, resp){
//	resp.sendfile('public/index.html');
//})
io.on('connection', function(socket){
	console.log('user connected');
	socket.on('mensaje', function(data){
		console.log('mensaje: '+data);
		io.emit('mensaje', data);
	})
	socket.on('disconnect', function(){
		console.log('user disconnected');
	})
})
//puerto en el que estoy escuchando
server.listen(process.env.PORT || 3000, console.log('funca en el: '+ process.env.PORT));
