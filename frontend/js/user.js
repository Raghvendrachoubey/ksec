userdata = {sid:$.jStorage.get("sid"),name:($.jStorage.get("fname")+' '+$.jStorage.get("fname"))};
// Update the value in the user name input.
function updateMyName(me) {
  //console.log(me);
  
  //$('#my-name').val(me.name == 'unknown' ? 'User #' + me.id : me.name);
  $('#my-name').val(me.name == 'unknown' ? 'User #' + me.id : me.name);
}

// Update the current user's username
function updateName() {
  // Use the Sails blueprint action to update the user
  io.socket.put('/user/'+window.me.id, {name: $('#my-name').val()});
}

// Add a user to the list of available users to chat with
function addUser(user) {
  //console.log(user);
  // Get a handle to the user list <select> element
  var select = $('#users-list');
  // if($.jStorage.get("socketId") == user.socketId)
  // {
  //     user.id = userdata.id;
  //     user.name = userdata.name;
  // }
  // else
  {
    // Create a new <option> for the <select> with the new user's information
    var option = $('<option id="'+"user-"+user.id+'" uid="'+user.id+'" sid="'+user.sid+'" value="'+user.id+'">'+(user.name == "unknown" ? "User #" + user.id : user.name)+'</option>');
  }
  // Add the new <option> element
  select.append(option);
}

// Remove a user from the list of available users to chat with, by sending
// either a user object or a user ID.
function removeUser(user) {

  // Get the user's ID
  var id = user.id || user;
  //console.log(id);
  if(id !='' && id)
  {
	  

	  
  }
  else
  {
	  sid=$("#users-list").attr("sid");
	  var id=$("#user-list[sid='"+sid+"']").attr("uid");
  }
  var userName = $('#user-'+id).text();

	  // Remove the corresponding element from the users list
	  var userEl = $('#user-'+id).remove();
  
  // Re-append it to the body as a hidden element, so we can still
  // get the user's name if we need it for other messages.
  // A silly hack for a silly app.
  userEl.css('display', 'none');
  $('body').append(userEl);

  // Post a user status message if we're in a private convo
  if ($('#private-room-'+id).length) {
    //postStatusMessage('private-messages-'+id, userName + ' has disconnected.');
    postStatusMessage('private-messages-'+id, 'User has disconnected.');
    $('#private-message-'+id).hide();
    $('#private-button-'+id).hide();
  }
}

// Add multiple users to the users list.
function updateUserList(users) {
  //console.log(users);
  users.forEach(function(user) {
    //console.log(user);
    if (user.id == me.id) {return;}
    addUser(user);
  });
}