var categories = ( function () {

  var settings = {};

  var _deleteCategory = function(id) {    
    $.ajax({
      url: '/api/categories/'+ id,
      type: 'DELETE',
      error: function(err) {        
        console.error(err);        
      },
      complete: function(xhr) {        
        window.location = xhr.url; 
      }
    });
  };

  var _updateCategory = function(id) {
    $.ajax({
      url: '/api/categories/'+ id,
      type: 'GET',
      error: function(err) {        
        console.error(err);        
      },
      success: function(response) {
        var formElements = settings.form[0].elements;    
        // populate form
        for (i in response.data) {        
          if (i in formElements) {
            formElements[i].value = response.data[i];
          }
        }
      },
      complete: function(xhr) {        
        settings.form.attr('method', 'PUT');
        settings.form.attr('action', '/api/categories/' + id);
        settings.submitBtn.text('Update'); 
        settings.box.removeClass('hidden');
      }
    });
  };


  return {
      
    init: function() {
      settings.form      = $("#categories-form");
      settings.box       = $("#categories-box");
      settings.addBtn    = $("#add-categories-btn");
      settings.cancelBtn = $("#cancel-categories-btn");
      settings.submitBtn = $("#submit-categories-btn");
      settings.deleteBtn = $(".delete-categories-btn");
      settings.updateBtn = $(".update-categories-btn");

      this.bindEvents();
    },

    bindEvents: function() {      
      settings.addBtn.click( function() {            
        settings.form[0].reset();
        settings.form.attr('method', 'POST');
        settings.form.attr('action', '/api/categories');
        settings.submitBtn.text('Create');
        settings.box.removeClass('hidden');
      });
      settings.cancelBtn.click( function() {
        settings.box.addClass('hidden');
      });
      settings.cancelBtn.click( function() {
        settings.box.addClass('hidden');
      });
      // delete
      settings.deleteBtn.click( function(e) {
        e.preventDefault();
        var id = $(this).data('item-id');
        if(id && confirm('Are you sure?')) {
            return _deleteCategory(id);
        }
      });
      // update
      settings.updateBtn.click( function(e) {
        e.preventDefault();
        var id = $(this).data('item-id');        
        if(id) {
          _updateCategory(id);
        }        
      });
      // form submit
      settings.form.submit( function(e) {
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