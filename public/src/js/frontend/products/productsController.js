// src/js/frontend/products/productsController.js
'use strict';

angular.module('app.products', [])
  .controller('productsController', function($scope, productsService) {

    $scope.products = [];

    $scope.getProducts = function() {
      productsService.getAll( function (err, res) {
        if(err)
          $scope.message = 'No products available';

        $scope.products = res;
      });
    }

    $scope.getProducts();
    
  });