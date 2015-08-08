// src/js/frontend/products/productService.js
'use strict';

angular.module('app.products')
  .factory('productService', function($http, localStorageService) {
    
    var productList = [];

    return {

      getProducts: function(cb) {
        $http.get('/api/products/')
          .success( function(res) {
            //console.log(res.data)
            return cb(null, res.data);
          })
          .error( function(err) {
            console.error(err)
            return cb(true, err);
          });
      },

      getItems: function(){
        productList = localStorageService.get('localStorageCart');
        return productList;
      },

      addProduct: function(item) {        
        productList.push({ 
          qty: parseInt(item.qty),
          name: item.name,
          price: item.price 
        });
        // set key
        localStorageService.set('localStorageCart', productList);
      },

      removeProduct: function(index) {        
        productList.splice(index, 1);
        localStorageService.remove('localStorageCart');      
        localStorageService.set('localStorageCart', productList);
      }

    }

  });