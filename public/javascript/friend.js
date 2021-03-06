var position = 0;

function friendRequest() {
  socket.emit('friend-request', { user: '{{id}}', friend: $("#friendLogin").val() } );
  $('#friendLogin').val('');
}

function displayFriend() {
  if (position == 0) {
    $("#blockFriend").css("right","70%");
    $("#blockMain").css("width","70%");
    $("#leftArrow").css("transform","rotate(0deg)");
    position = 1;
  } else {
    $("#blockFriend").css("right","100%");
    $("#blockMain").css("width","100%");
    $("#leftArrow").css("transform","rotate(180deg)");
    position = 0;
  }

}

function confirmRequest(friend) {
  socket.emit('confirm-request', { friend: friend } );
}

function cancelRequest(friend) {
  socket.emit('cancel-request', { friend: friend } );
}

socket.on('friend-confirmed', function (data) {
  $("#"+data.data+"-icon").html('<i class="fas fa-circle"></i>');
  $('.friend-confirmed').css('display','block');
  setTimeout(function() { $(".friend-confirmed").css('display','none'); }, 5000);
});

socket.on('friend-canceled', function (data) {
  $("#"+data.data).css('display','none');
  $('.friend-canceled').css('display','block');
  setTimeout(function() { $(".friend-canceled").css('display','none'); }, 5000);
});

var list = new List('friend-list', {
  valueNames: ['name']
});
