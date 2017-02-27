

function abrirChatPriv(e){
	//id es la id de la persona a la que mando el mensaje
	//nombre es el nombre de la persona a la que mando el mensaje
	let divId = e.currentTarget.id;
		let pos=listaUserId.indexOf(listaUserId.find( (i) => i.elemId == '#'+divId));
		let id = listaUserId[pos].id;
		let nombre = listaUserId[pos].nombre;
		console.log(nombre, ':', id);
	if(!$('#'+id).length){
		$('#privao').append($('<div id="dialog" title="Chat privado con: '+nombre+'"><div class="col-sm-8 privaoation chat-priv" id="'+id+'"></div></div>'));
		message(id);
		reply(id);
		$( "#dialog" ).dialog();
		$('.ui-button').click(()=>$('.ui-dialog').hide());
	}else{
		$('.ui-dialog').show();
	}
}
function abrirChatPrivResp(nombre, id){
	//datos de la persona que me ha hablado
	let prueba = '#'+id;
	if(!$(prueba).length){
		$('#privao').append($('<div id="dialog" title="Chat privado con: '+nombre+'"><div class="col-sm-8 conversation chat-priv" id="'+id+'"></div></div>'));
		message(id);
		reply(id);
		$( "#dialog" ).dialog();
		$('.ui-button').click(()=>$('.ui-dialog').hide());
	}else{
		$('.ui-dialog').show();
	}
}
function message(id){
	$('#'+id).append('<div class="row message" id="mens'+id+'"></div>');
}
function reply(id){
	$('#'+id).append('<div class="row reply"><div class="col-sm-9 col-xs-9 reply-main"><textarea class="form-control" rows="1" id="comment'+id+'" placeholder="Escribe tu mensaje aquí"></textarea></div></div>');
	$('#comment'+id).keypress(function( event ) {
  		if ( event.keyCode == 13 ) {
     		enviarMensajePrivado(id);
  		}
	});
}
function escribirDialog(id, nombre){
	var elemChat = $('<div class="row message-body"><div class="col-sm-12 message-main-sender"><div class="sender"><div class="col-sm-8 col-xs-7 message-name">'+nombre+'</div><div class="message-text">'+$('#comment'+id).val()+'</div><span class="message-time pull-right">'+fecha()+'</span></div></div></div>');
	$('#mens'+id).append(elemChat);
}
function enviarMensajePrivado(id){
    socket.emit('mensajePriv', $('#comment'+id).val(), id);
    escribirDialog(id, $('#tunombre').text());
    $('#comment'+id).val('');
    return false;
}
socket.on('mensajePriv', function(msg, nombre, id){
	//id es la id de la persona que me envia el mensaje
	//nombre es el nombre de la persona que me envia el mensaje
	abrirChatPrivResp(nombre, id);
    var elemChat = $('<div class="row message-body"><div class="col-sm-12 message-main-receiver"><div class="receiver"><div class="col-sm-8 col-xs-7 message-name">'+nombre+'</div><div class="message-text">'+msg+'</div><span class="message-time pull-right">'+fecha()+'</span></div></div></div>');
    $('#mens'+id).append( elemChat );
});
