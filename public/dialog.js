
function abrirChatPriv(nombre, id){
	console.log(nombre, ':', id);
	$('#convers').append($('<div id="dialog" title="'+nombre+'"><div class="col-sm-8 conversation" id="'+id+'"></div></div>'));
	message(id);
	reply(id);
	$( "#dialog" ).dialog();
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
function escribirDialog(id){
	var elemChat = $('<div class="row message-body"><div class="col-sm-12 message-main-sender"><div class="sender"><div class="col-sm-8 col-xs-7 message-name">'+socket.nombre+'</div><div class="message-text">'+$('#comment'+id).val()+'</div><span class="message-time pull-right">'+fecha()+'</span></div></div></div>');
	$('#mens'+id).append(elemChat);
}
function enviarMensajePrivado(id){
    escribirDialog(id);
    socket.emit('mensajePriv', $('#comment'+id).val(), socket.nombre, id);
    $('#comment'+id).val('');
    return false;
}
socket.on('mensajePriv', function(msg, nombre, id){
	console.log('mensaje privado');
	if(!$('#'+id)){
		abrirChatPriv(nombre, id);
	}
    var elemChat = $('<div class="row message-body"><div class="col-sm-12 message-main-receiver"><div class="receiver"><div class="col-sm-8 col-xs-7 message-name">'+nombre+'</div><div class="message-text">'+msg+'</div><span class="message-time pull-right">'+fecha()+'</span></div></div></div>');
    $('#mens'+id).append( elemChat );
});
/*<!-- Dialog Privado-->
  	<div id="dialog" title="Privado">
      	<div class="col-sm-8 conversation">
        <!-- Heading -->
        <div class="row heading">
          <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
            <div class="heading-avatar-icon">
              <img src="/img/p.jpg">
            </div>
          </div>
          <div class="col-sm-8 col-xs-7 heading-name">
            <a class="heading-name-meta">Chat General
            </a>
            <span class="heading-online">Online</span>
          </div>
          <div class="col-sm-1 col-xs-1  heading-dot pull-right">
            <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
          </div>
        </div>
        <!-- Heading End -->

        <!-- Message Box -->
        
        <div class="row message" id="conversacion">
        </div>
        

        <!-- Message Box End -->

        <!-- Reply Box -->
        <div class="row reply">
          <div class="col-sm-9 col-xs-9 reply-main">
            <textarea class="form-control" rows="1" id="comment" placeholder="Escribe tu mensaje aquí"></textarea>
          </div>
          <div class="col-sm-1 col-xs-1 reply-recording">
            <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
          </div>
          <div class="col-sm-1 col-xs-1 reply-send">
            <i class="fa fa-send fa-2x" aria-hidden="true"></i>
          </div>
        </div>
        <!-- Reply Box End -->
      </div>
	</div>
<!-- fin Dialog Privado -->*/
