var users = ( function () {

  var settings = {};

  var _deleteUser = function(id) {    
    $.ajax({
      url: '/api/users/'+ id,
      type: 'DELETE',
      error: function(err) {        
        console.error(err);        
      },
      complete: function(xhr) {        
        window.location = xhr.url; 
      }
    });
  };

  var _updateUser = function(id) {
    $.ajax({
      url: '/api/users/'+ id,
      type: 'GET',
      error: function(err) {        
        console.error(err);        
      },
      success: function(response) {
        var formElements = settings.form[0].elements;
        console.log(formElements)
        // populate form
        for (i in response.data) {        
          if (i in formElements) {
            formElements[i].value = response.data[i];
          }
        }
      },
      complete: function(xhr) {        
        settings.form.attr('method', 'PUT');
        settings.form.attr('action', '/api/users/' + id);
        settings.submitBtn.text('Update'); 
        settings.box.removeClass('hidden');
      }
    });
  };


  return {
      
    init: function() {
      settings.form      = $("#users-form");
      settings.box       = $("#users-box");
      settings.cancelBtn = $("#cancel-users-btn");
      settings.submitBtn = $("#submit-users-btn");
      settings.deleteBtn = $(".delete-users-btn");
      settings.updateBtn = $(".update-users-btn");

      this.bindEvents();
    },

    bindEvents: function() {      

      settings.cancelBtn.click(function() {
        settings.box.addClass('hidden');
      });
      settings.cancelBtn.click(function() {
        settings.box.addClass('hidden');
      });
      // delete
      settings.deleteBtn.click(function(e) {
        e.preventDefault();
        var id = $(this).data('item-id');
        if(id && confirm('Are you sure?')) {
            return _deleteUser(id);
        }
      });
      // update
      settings.updateBtn.click(function(e) {
        e.preventDefault();
        var id = $(this).data('item-id');        
        if(id) {
          _updateUser(id);
        }        
      });
      // form submit
      settings.form.submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();  
        var method = $(this).attr('method');
        var action = $(this).attr('action');

        $.ajax({
          type: method,
          url: action,
          data: formData,
          dataType: 'json',
          encode: true,
          error: function(err) {        
            console.error(err);
          },
          complete: function(xhr) {
            window.location = xhr.url; 
          } 
        });
      });

    }
  
  }  
})();