var socket = io();
datos={};
var listaUserId=[];

function escribirPantalla(){
	var elemChat = $('<div class="row message-body"><div class="col-sm-12 message-main-sender"><div class="sender"><div class="col-sm-8 col-xs-7 message-name">'+datos.nombre+'</div><div class="message-text">'+$('#comment').val()+'</div><span class="message-time pull-right">'+fecha()+'</span></div></div></div>');
	$('#conversacion').append(elemChat);
	elemChat.get(0).scrollIntoView();
	
	/*.text($('#comment').val())*/
}
function mostrar(){
	datos.nombre = $('#nombre').val();
	datos.estado = $('#estado').val();
	$('#tunombre').text(datos.nombre);
	$('#tuestado').text(datos.estado);
	enviarUsuario();
	$('#show1').hide();
}
function fecha(){
	let fecha = new Date();
	let hora = fecha.getHours();
	let min = fecha.getMinutes();
	return hora +":"+ min
}
function enviarUsuario(){
	socket.emit('usuario',datos);
	return false;
}
function enviarMensaje(){
    escribirPantalla();
    socket.emit('mensaje', $('#comment').val(), datos.nombre);
    $('#comment').val('');
    return false;
}
function destruirUsuarios(){
	for (user of listaUserId){
		$(user.elemId).remove();
	}
	listaUserId=[];
}
socket.on('usuario', function(listaConectados){
	destruirUsuarios();
	cont = 0;
	for (user of listaConectados){
		if(user.id == socket.id){
			cont++;
			listaUserId.push(user);
		}else{
			var elemUser = $('<div class="row sideBar-body" id="user'+user.id+'"><div class="col-sm-3 col-xs-3 sideBar-avatar"><div class="avatar-icon"><img src="/img/p.jpg"></div></div><div class="col-sm-9 col-xs-9 sideBar-main"><div class="row"><div class="col-sm-8 col-xs-8 sideBar-name"><span class="name-meta">'+user.nombre+'</span><span class="heading-online">'+ user.estado +'</span></div><div class="col-sm-4 col-xs-4 pull-right sideBar-time"><span class="time-meta pull-right">'+fecha()+'</span></div></div></div></div>')
			$('#conectados').append(elemUser);
			user.elemId = '#user'+user.id;
			$(user.elemId).click( () => abrirChatPriv(user.nombre, cont) );
			cont++;
			listaUserId.push(user);
		}
	}
});
socket.on('disconnect', function(nombre){
	var elemChat = $('<div class="row message-body"><div class="col-sm-8 col-xs-7 text-center message-name"> El usuario '+nombre+' se ha desconectado.</div></div>');
	$('#conversacion').append( elemChat );
    elemChat.get(0).scrollIntoView();
});
socket.on('mensaje', function(msg, nombre){
    var elemChat = $('<div class="row message-body"><div class="col-sm-12 message-main-receiver"><div class="receiver"><div class="col-sm-8 col-xs-7 message-name">'+nombre+'</div><div class="message-text">'+msg+'</div><span class="message-time pull-right">'+fecha()+'</span></div></div></div>');
    $('#conversacion').append( elemChat );
    elemChat.get(0).scrollIntoView();
});


window.onload = function(){
	$('#comment').keypress(function( event ) {
  		if ( event.keyCode == 13 ) {
     		enviarMensaje();
  		}
	});
}