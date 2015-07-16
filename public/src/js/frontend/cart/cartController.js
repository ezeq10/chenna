// src/js/frontend/products/cartController.js
'use strict';

angular.module('app.cart', [])
  .controller('cartController', function($scope) {

    $scope.cart = { items: []};

    $scope.addItem = function(item) {
      $scope.cart.items.push(item);
    };

    $scope.removeItem = function(index) {
      $scope.cart.items.splice(index, 1);
    }

    
    /*
    $scope.total = function() {
      var total = 0;
      angular.forEach($scope.cart.items, function(item) {
        total += item.quantity * item.price;
      });
      return total;
    }
    */

    
  });