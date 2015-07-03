$(document).ready(function() {
  
  var userProfile;

  // add token to each ajax call
  $.ajaxSetup({
    beforeSend: function(xhr) {
      if (localStorage.getItem('userToken')) {
        xhr.setRequestHeader('x-access-token', 'Bearer ' + localStorage.getItem('userToken'));
      }
    }
  });

  // submit register form
  $("#register-form").on('submit',function(e) {    
    var formData = $(this).serialize();        
    $.ajax({
      type: 'POST',
      url: '/register',
      data: formData,
      dataType: 'json',
      encode: true
    }).done(function(data) {      
      if(data.token) {
        localStorage.setItem('userToken', data.token);
        showLoginBox();
      } else {
        console.error('Unable to get token');
      }

    }).fail(function(err) {
      console.error(err.responseJSON);
    });

    e.preventDefault();
  });


  // submit login form
  $("#login-form").on('submit',function(e) {    
    var formData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/login',
      data: formData,
      dataType: 'json',
      encode: true
    }).done(function(data) {      
      
      if(data.token) {
        localStorage.setItem('userToken', data.token);
        userProfile = data.profile;
        // show user data
        showUserBox(userProfile);

      } else {
        console.error('Unable to get token');
      }

    }).fail(function(err) {
      console.error(err.responseJSON);
    });

    e.preventDefault();
  });


  // form btns events
  $('#show-login-btn').click(function(e) {
    e.preventDefault();
    showLoginBox();    
    return false;
  });
  $('#show-register-btn').click(function(e) {
    e.preventDefault();
    showRegisterBox();  
    return false;
  });  

});

function showLoginBox() {
  $("form")[0].reset();
  $("#register-box").addClass('hidden');
  $("#login-box").removeClass('hidden');
}

function showRegisterBox() {
  $("form")[0].reset();
  $("#login-box").addClass('hidden');
  $("#register-box").removeClass('hidden');
}

function showUserBox(profile) {
  $('#sidebar').html(profile);
  $('#sidebar').append('<p>Welcome '+ profile.name +'</p>');
  
  if(profile.isAdmin) {
    $('#sidebar').append('<p><a id="admin-btn" href="javascript:void(0)">Go to admin</a></p>');  
    $('#admin-btn').bind( "click", function() {
      window.location.href = "/admin/?token=" + localStorage.getItem('userToken');
    });  
  }

  $('#sidebar').append('<p><a id="logout-btn" href="javascript:void(0)">Logout</a></p>');
  $('#logout-btn').bind( "click", function() {
    logout();
  });
}

function logout() {
  localStorage.removeItem('userToken');
  userProfile = null;
  window.location.href = "/";
}