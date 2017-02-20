var socket = io();
$(function(){
	$('form').submit(function(){
	    socket.emit('mensaje', $('#m').val());
	    $('#m').val('');
	    return false;
	  });
})
socket.on('mensaje', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
