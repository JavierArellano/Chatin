var socket = io();
var intervalo=0;
datos={};
var listaUserId=[];

function escribirPantalla(){
	var elemChat = $('<div class="row message-body"><div class="col-sm-12 message-main-sender"><div class="sender"><div class="col-sm-8 col-xs-7 message-name">'+datos.nombre+'</div><div class="message-text">'+$('#comment').val()+'</div><span class="message-time pull-right">'+fecha()+'</span></div></div></div>');
	$('#conversacion').append(elemChat);
	//elemChat.get(0).scrollIntoView();
}
function mostrar(){
	datos.nombre = $('#nombre').val();
	datos.estado = $('#estado').val();
	$('#tunombre').text(datos.nombre);
	$('#tuestado').text(datos.estado);
	$('#tuimagen').prop('src', '/img/'+datos.imagen);
	enviarUsuario();
	$('#show1').hide();
	$('#show2').show();
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
	for (user of listaConectados){
		if(user.id == socket.id){
			listaUserId.push(user);
		}else{
			var elemUser = $('<div class="row sideBar-body" id="user'+user.id+'"><div class="col-sm-3 col-xs-3 sideBar-avatar"><div class="avatar-icon"><img src="/img/'+user.imagen+'"></div></div><div class="col-sm-9 col-xs-9 sideBar-main"><div class="row"><div class="col-sm-8 col-xs-8 sideBar-name"><span class="name-meta">'+user.nombre+'</span><span class="heading-online">'+ user.estado +'</span></div><div class="col-sm-4 col-xs-4 pull-right sideBar-time"><span class="time-meta pull-right">'+fecha()+'</span></div></div></div></div>')
			$('#conectados').append(elemUser);
			user.elemId = '#user'+user.id;
			$(user.elemId).click( (e) => abrirChatPriv(e) );
			listaUserId.push(user);
		}
	}
});
socket.on('disconnect', function(nombre){
	if (nombre!='transport close'){
		var elemChat = $('<div class="row message-body"><div class="col-sm-8 col-xs-7 text-center message-name-disconnect"> El usuario '+nombre+' se ha desconectado.</div></div>');
		$('#conversacion').append( elemChat );
    	//elemChat.get(0).scrollIntoView();
    }else{
		var elemChat = $('<div class="row message-body"><div class="col-sm-8 col-xs-7 text-center message-name-disconnect">Y yo volé de él, pero vole de él por acá, por la arbolada.</div></div>');
		$('#conversacion').append( elemChat );
    	//elemChat.get(0).scrollIntoView();
    }
});
socket.on('conectado', function(nombre){
	var elemChat = $('<div class="row message-body"><div class="col-sm-8 col-xs-7 text-center message-name-connect"> El usuario '+nombre+' se ha conectado.</div></div>');
	$('#conversacion').append( elemChat );
    //elemChat.get(0).scrollIntoView();
});
socket.on('mensaje', function(msg, nombre){
    var elemChat = $('<div class="row message-body"><div class="col-sm-12 message-main-receiver"><div class="receiver"><div class="col-sm-8 col-xs-7 message-name">'+nombre+'</div><div class="message-text">'+msg+'</div><span class="message-time pull-right">'+fecha()+'</span></div></div></div>');
    $('#conversacion').append( elemChat );
    //elemChat.get(0).scrollIntoView();
});
socket.on('escribiendo', function(nombre){
	$('#estGlobal').text(nombre+' está escribiendo');
})
socket.on('noEscribiendo', function(){
	$('#estGlobal').text('Online');
})

function finescrib(){
	socket.emit('noEscribiendo');
	intervalo=null;
}

function mostrarImg(id){
	ids=['#a','#g','#h','#p','#s','#u'];
	for (i of ids){
		if (i == id) {
			$(i).css('border','2px solid blue');
		} else {
			$(i).css('border','');
		}
	}
	datos.imagen = $(id).prop('src').split('/').pop();
}

window.onload = function(){
	$('#a').click( () => mostrarImg(id='#a') );
	$('#g').click( () => mostrarImg(id='#g') );
	$('#h').click( () => mostrarImg(id='#h') );
	$('#p').click( () => mostrarImg(id='#p') );
	$('#s').click( () => mostrarImg(id='#s') );
	$('#u').click( () => mostrarImg(id='#u') );
	$('#comment').keypress(function( event ) {
  		if ( event.keyCode == 13 ) {
     		enviarMensaje();
  		}else{
  			if (!intervalo){
  				socket.emit('escribiendo',datos.nombre);
  			}else{
  				clearTimeout(intervalo);
  			}
  			intervalo = setTimeout(finescrib, 1000);
  		}
	});
}