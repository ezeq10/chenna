// src/js/frontend/products/productService.js
'use strict';

angular.module('app.products')
  .factory('productService', function($http) {
      
    return {

      getAll: function(cb) {

        $http.get('/api/products/')
          .success( function(res) {
            //console.log(res.data)
            return cb(null, res.data);
          })
          .error( function(err) {
            console.error(err)
            return cb(true, err);
          });
      }

    }

  });