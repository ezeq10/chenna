// src/js/frontend/products/productController.js
'use strict';

angular.module('app.products', [])
  .controller('productController', function($scope, productService) {

    $scope.products = [];

    $scope.getProducts = function() {      
      productService.getProducts( function (err, res) {
        if(err) {
          $scope.message = 'No products available';
          return false;
        }
        $scope.products = res;
      });
    }    

    $scope.addItem = function(item) {
      if(isNaN(item.qty) || item.qty < 0) {
        $scope.message = 'You must insert a valid quantity for this item';
        return false;
      }
      if(item.qty > item.stock) {
        $scope.message = 'No available stock for this item';
        return false;
      }      
      productService.addProduct(item);
    }    

    $scope.setQuantity = function (index, upordown) {     

      var _qty = parseInt($scope.products[index].qty);

      if(isNaN(_qty))
        _qty = 1;

      if(upordown == 'up') {
        _qty++;
      } else {
        if(_qty > 1)
          _qty--;
      }
      $scope.products[index].qty = _qty;
    }

    $scope.getProducts();
  });