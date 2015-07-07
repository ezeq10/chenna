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