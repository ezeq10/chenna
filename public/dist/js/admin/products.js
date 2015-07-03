$('#add-products-btn').on('click',function(e){
  $("#products-box").removeClass('hidden');
});

$('#cancel-products-btn').on('click',function(e){
  $("#products-box").addClass('hidden');
});

// add
$('#products-form').on('submit',function(e){  
  var formData = $(this).serialize();   
  $.ajax({
    type: 'POST',
    url: '/api/products',
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
$('.delete-product-btn').on('click', function(e){    
  var id = $(this).data('item-id');
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
  e.preventDefault();
});