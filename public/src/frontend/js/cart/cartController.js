// src/js/frontend/products/cartController.js
'use strict';

angular.module('app.cart', [])
  .controller('cartController', function($scope, productService) {

    $scope.items = productService.getProductList();

    $scope.removeItem = function(index) {
      productService.removeProduct(index);
    }

    $scope.getTotal = function() {
      var total = 0;
      angular.forEach($scope.items, function(item) {
        total += item.qty * item.price;
      });

      productService.setTotal(total);
      return total;
    }

    

  });