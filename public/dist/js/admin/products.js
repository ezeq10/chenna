
$('#add-products-btn').on('click',function(e){
  $("#products-box").removeClass('hidden');
});

$('#cancel-products-btn').on('click',function(e){
  $("#products-box").addClass('hidden');
});

$('#products-form').on('submit',function(e){
  
  var formData = $(this).serialize(); 
  
  $.ajax({
    type: 'POST',
    url: '/api/products',
    data: formData,
    dataType: 'json',
    encode: true
  }).done(function(data) {
    console.log(data);

  }).fail(function(err) {
    console.error(err.responseJSON);
  });
  e.preventDefault();  
});