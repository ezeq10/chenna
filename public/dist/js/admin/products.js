var products = ( function () {

  var settings = {};

  var _deleteProduct = function(id) {    
    $.ajax({
      url: '/api/products/'+ id,
      type: 'DELETE',
      error: function(err) {        
        console.error(err);        
      },
      complete: function(xhr) {        
        window.location = xhr.url; 
      }
    });
  };

  var _updateProduct = function(id) {
    $.ajax({
      url: '/api/products/'+ id,
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
        settings.form.attr('action', '/api/products/' + id);
        settings.submitBtn.text('Update'); 
        settings.box.removeClass('hidden');
      }
    });
  };


  return {
      
    init: function() {
      settings.form      = $("#products-form");
      settings.box       = $("#products-box");
      settings.addBtn    = $("#add-products-btn");
      settings.cancelBtn = $("#cancel-products-btn");
      settings.submitBtn = $("#submit-products-btn");
      settings.deleteBtn = $(".delete-products-btn");
      settings.updateBtn = $(".update-products-btn");

      this.bindEvents();
    },

    bindEvents: function() {

      settings.addBtn.click(function() {            
        settings.form[0].reset();
        settings.form.attr('method', 'POST');
        settings.form.attr('action', '/api/products');
        settings.submitBtn.text('Create');
        settings.box.removeClass('hidden');
      });

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
            return _deleteProduct(id);
        }
      });
      // update
      settings.updateBtn.click(function(e) {
        e.preventDefault();
        var id = $(this).data('item-id');        
        if(id) {
          _updateProduct(id);
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

/*
$('#add-products-btn').on('click',function(e) {
  $("#products-form")[0].reset(); 
  $('#products-form').attr('method', 'POST');
  $('#products-form').attr('action', '/api/products'); 
  $('#submit-products-btn').text('Create');
  $("#products-box").removeClass('hidden');
});

$('#cancel-products-btn').on('click',function(e) {
  $("#products-box").addClass('hidden');
});

// add
$('#products-form').on('submit',function(e){  
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
  e.preventDefault();  
});

// delete
$('.delete-product-btn').on('click', function(e) {
  var id = $(this).data('item-id');
  
  if(confirm('Are you sure ?')) {    

    $.ajax({
      url: '/api/products/'+ id,
      type: 'DELETE',
      error: function(err) {        
        console.error(err);
      },
      complete: function(xhr) {        
        window.location = xhr.url; 
      }
    });
  }
  e.preventDefault();
});


// update
$('.update-product-btn').on('click', function(e){    
  var id = $(this).data('item-id');
  var formElements = $('#products-form')[0].elements;

  $.ajax({
    url: '/api/products/'+ id,
    type: 'GET',
    error: function(err) {      
      console.error(err);
    },
    success: function(response) {      
      // populate form
      for (i in response.data) {        
        if (i in formElements) {
          formElements[i].value = response.data[i];
        }
      }
    },
    complete: function(xhr) {
      $('#products-form').attr('method', 'PUT');
      $('#products-form').attr('action', '/api/products/' + id);
      $('#submit-products-btn').text('Update'); 
      $("#products-box").removeClass('hidden');
    }
  });
  e.preventDefault();
});
*/