var socket = io();

$("#signinForm").submit(function(e) {
  e.preventDefault();
});
$("#signupForm").submit(function(e) {
  e.preventDefault();
});

$("#country").countrySelect({
  preferredCountries: ['fr']
});

$('.modal').on('shown.bs.modal', function() {
  $(this).find('[autofocus]').focus();
});

function signin(){
  socket.emit('signin', $('#connect-login').val(), $('#connect-password').val());
}
function signup(){
  socket.emit('signup', $('#login').val(), $('#password').val(), $('#confpassword').val(), $('#mail').val(), $('#confmail').val(), $('#country').val());
}

socket.on('redirect', function(destination) {
  window.location.href = destination;
});

socket.on('connection_error', function(error) {
  $('#connectError').css({display:'block'});
  $('#connectError').html(error);
});


socket.on('inscription_error', function(error) {
  $('#inscriptionError').css({display:'block'});
  $('#inscriptionError').html(error);
});
