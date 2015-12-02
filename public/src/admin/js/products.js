var products = ( function () {

  var settings = {};

  /**
    Private methods
   */
  var _getProduct = function(id, cb) {    
    $.ajax({
      url: '/api/products/' + id,
      type: 'GET',
      error: function(err) {        
        console.error(err);        
        return cb(true, err)
      },
      success: function(data) {
        //console.log(data)
        return cb(null, data);
      }
    });
  };

  var _deleteProduct = function(id) {    
    $.ajax({
      url: '/api/products/' + id,
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

  var _createImageGallery = function(product_id) {
    var images;
    var html;
    settings.imageGallery.empty();
    
    _getProduct(product_id, function(err, res) {
      if(err) {
        console.error(err);
        html = '<span class="span4>Error on retrieving images</span>'; 
      }     

      images = res.data.images;
      if(images) {            
        html = '<ul id="gallery" class="row">';
        images.forEach( function (image) {
          html += '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4">';
          html += '<img src="/uploads/' + image.name + '" class="img-rounded" alt="' + image.text + '" width="100" height="75" />';
          html += '<a href="javascript:void(0)" class="delete-images-btn" data-image-id="' + image._id + '">delete</a>';
          html += '</li>';
        });
        html += '</ul>';

      } else {
        html = '<span class="span4>No images</span>';        
      }
      settings.imageGallery.append(html);
    });
  }

  var _getImageUploadPath = function() {
    return '/api/products/' + settings.productId.val() + '/images' 
  }

  var _deleteProductImage = function(product_id, image_id, cb) {    
    $.ajax({
      url: '/api/products/' + product_id + '/images/' + image_id,
      type: 'DELETE',
      error: function(err) {        
        console.error(err); 
        return cb(true, err); 
      },
      complete: function(xhr) {
        return cb(null);
      }
    });
  };

  return {
    
    /**
      Main settings
     */
    init: function() {      
      settings.box            = $("#products-box");
      settings.form           = $("#products-form");
      settings.imagesBox      = $("#images-box");
      settings.imagesForm     = $("#images-form");
      settings.addBtn         = $("#add-products-btn");
      settings.cancelBtn      = $("#cancel-products-btn");
      settings.submitBtn      = $("#submit-products-btn");
      settings.deleteBtn      = $(".delete-products-btn");
      settings.updateBtn      = $(".update-products-btn");
      settings.imagesBtn      = $(".images-products-btn");
      settings.imageGallery   = $("#image-gallery");
      settings.imageInput     = $("#image");
      settings.productId      = $("#product_id");

      this.bindEvents();
    },

    /**
      Init event handlers
     */
    bindEvents: function() {

      settings.addBtn.click( function() {            
        settings.form[0].reset();
        settings.form.attr('method', 'POST');
        settings.form.attr('action', '/api/products');
        settings.submitBtn.text('Create');
        settings.box.removeClass('hidden');
      });

      settings.cancelBtn.click( function() {
        settings.box.addClass('hidden');
      });

      settings.cancelBtn.click( function() {
        settings.box.addClass('hidden');
      });
     
      /**
        Delete product event
       */
      settings.deleteBtn.click( function(e) {
        e.preventDefault();
        var product_id = $(this).data('item-id');
        if(product_id && confirm('Are you sure?')) {
            return _deleteProduct(product_id);
        }
      });

      /**
        Update product event
       */
      settings.updateBtn.click( function(e) {
        e.preventDefault();
        var product_id = $(this).data('item-id');        
        if(product_id) {
          _updateProduct(product_id);
        }        
      });

      /**
        Products form submit
       */
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


      /**
        Create upload input file
       */
      settings.imageInput.fileupload({
        add: function(ev,data) {
          data.url = _getImageUploadPath()
          data.submit();
        },
        done: function(ev, data) {
          var product_id = settings.productId.val()
          _createImageGallery(product_id);
        },
        progressall: function (e, data) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          $('.progress-bar').css('width', progress + '%');
        }
      });

      /**
        Show images gallery and upload input file
       */
      settings.imagesBtn.click( function() {
        var product_id = $(this).data('item-id');
        settings.productId.val(product_id);

        _createImageGallery(product_id);
        settings.imagesBox.removeClass('hidden');
      });      

      /**
        Added event handlers for dynamic elements
       */
      $(document).on('click', '.delete-images-btn' , function(e) {        
        e.preventDefault();
        var product_id = settings.productId.val();
        var image_id = $(this).data('image-id');

        if(product_id && image_id && confirm('Are you sure?')) {

          _deleteProductImage(product_id, image_id, function(err, res) {
            if(err)
              return false;

            _createImageGallery(product_id);
          });          
        }
      });

      /**        
        Image modal
       */
      $(document).on('click','#gallery img', function(e) {
        e.preventDefault();
        var src = $(this).attr('src');
        var img = '<img src="' + src + '" class="img-responsive"/>';
        $('#myModal').modal();
        $('#myModal').on('shown.bs.modal', function(){
          $('#myModal .modal-body').html(img);
        });
        $('#myModal').on('hidden.bs.modal', function(){
          $('#myModal .modal-body').html('');
        });
      });

    }

  }  
})();