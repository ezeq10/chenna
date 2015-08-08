// src/frontend/js/products/checkoutController.js
'use strict';

angular.module('app.checkout', [])
  .controller('checkoutController', function($scope, productService) {
    
    $scope.items = productService.getProductList();
    $scope.total = productService.getTotal();


  });