$(document).ready(function() {

  // add token to each ajax call
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.url = window.location;
      if (localStorage.getItem('userToken')) {
        //console.log(localStorage.getItem('userToken'))
        xhr.setRequestHeader('x-access-token', localStorage.getItem('userToken'));
      }
    }
  });


  // navigate sections
  $('.nav-link').click(function(e) { 
    e.preventDefault();
    var url = $(this).attr('href');
    window.location.href = url + '/?token=' + localStorage.getItem('userToken');
    return false;
  });

  $('#logout-btn').click(function(e) {
    e.preventDefault();
    logout();
    return false;
  });
  
});

function logout() {  
  localStorage.removeItem('userToken');
  window.location.href = "/";
}