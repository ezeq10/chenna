// src/js/frontend/products/productsController.js
'use strict';

angular.module('app.products', [])

  .controller('productsController', function($scope, productsService) {

    $scope.getProducts = function() {
      productsService.getAll( function (err, res) {
        if(err)
          return false;

        $scope.items = res;
      });
    }

    $scope.addToCart = function() {
      console.log('Add to cart')
    };

    
    $scope.getProducts();
    
  });