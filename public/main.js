var socket = io();

function escribirPantalla(){
	$('#messages').append($('<li class="mio">').text($('#texto').val()));
}

function enviarMensaje(){
    escribirPantalla();
    socket.emit('mensaje', $('#texto').val());
    $('#texto').val('');
    return false;
};

socket.on('mensaje', function(msg){
    $('#messages').append($('<li>').text(msg));
});


window.onload= function(){
	$('#texto').keypress(function( event ) {
  		if ( event.keyCode == 13 ) {
     		enviarMensaje();
  		}
	});
}
