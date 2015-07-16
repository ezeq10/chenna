// src/js/frontend/products/cartController.js
'use strict';

angular.module('app.cart', [])
  .controller('cartController', function($scope) {

    $scope.cart = { items: []};

    $scope.addItem = function(item) {
      //console.log(item)
      $scope.cart.items.push({ 
        qty: item.qty,
        name: item.name,
        price: item.price 
      });
    };

    $scope.removeItem = function(index) {
      $scope.cart.items.splice(index, 1);
    }

    $scope.getTotal = function() {
      var total = 0;
      angular.forEach($scope.cart.items, function(item) {
        total += item.qty * item.price;
      });
      return total;
    }
    
  });