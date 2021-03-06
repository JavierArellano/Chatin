//para ejecutar el server en cmd: nodemon server/server.js
var listaConectados=[];
// importado de libreria express
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var dl = require("delivery");
var fl = require("fs");

app.use(express.static("public"));

//io.sockets
function borrarUser(ID){
	listaConectados.splice( listaConectados.indexOf(listaConectados.find( (i) => i.id == ID)),1);
}
io.on('connection', function(socket){
	let user = {};
	socket.on('mensajePriv', function(texto, id){
		socket.broadcast.to(id).emit('mensajePriv', texto, socket.nombre, socket.id);
	})
	socket.on('usuario', function(datos){
		socket.nombre=datos.nombre;
		socket.estado=datos.estado;
		user.imagen=datos.imagen;
		user.nombre=socket.nombre;
		user.estado=socket.estado;
		user.id=socket.id
		listaConectados.push(user);
		io.emit('usuario',listaConectados);
		socket.broadcast.emit('conectado', user.nombre);
		//console.log(listaConectados);
	})
	socket.on('mensaje', function(data, nombre){
		socket.broadcast.emit('mensaje', data, nombre);
	})
	socket.on('escribiendo', function(nombre){
		socket.broadcast.emit('escribiendo', nombre);
	})
	socket.on('noEscribiendo', function(){
		socket.broadcast.emit('noEscribiendo');
	})
	socket.on('disconnect', function(){
		borrarUser(socket.id);
		io.emit('usuario',listaConectados);
		io.emit('disconnect', socket.nombre);
	})
})
//puerto en el que estoy escuchando 
server.listen(/*3000 ||*/ process.env.PORT);
