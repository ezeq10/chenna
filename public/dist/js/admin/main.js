$(document).ready(function() {

  // add token to each ajax call
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.url = window.location;
      if (localStorage.getItem('userToken')) {
        //console.log(localStorage.getItem('userToken'))
        xhr.setRequestHeader('x-access-token', localStorage.getItem('ls.userToken').replace(/"/g,""));
      }
    }
  });


  // navigate sections
  $('.nav-link').click( function(e) { 
    e.preventDefault();
    var url = $(this).attr('href');
    window.location.href = url + '/?token=' + localStorage.getItem('ls.userToken').replace(/"/g,"");
    return false;
  });

  $('#logout-btn').click( function(e) {
    e.preventDefault();
    logout();
    return false;
  });
  
  products.init();
  users.init();
  
});

function logout() {  
  localStorage.removeItem('ls.userToken');
  localStorage.removeItem('ls.userProfile');
  window.location.href = "/";
}