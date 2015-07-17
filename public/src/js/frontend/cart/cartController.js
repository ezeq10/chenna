// src/js/frontend/products/cartController.js
'use strict';

angular.module('app.cart', [])
  .controller('cartController', function($scope, localStorageService) {

    $scope.cart = { items: []};

    var _qty = 1;

    $scope.addItem = function(item) {

      if(isNaN(item.qty) || item.qty < 0) {
        $scope.message = 'You must insert a valid quantity for this item';
        return false;
      }

      $scope.cart.items.push({ 
        qty: parseInt(item.qty),
        name: item.name,
        price: item.price 
      });

      // set key
      localStorageService.set('localStorageCart', $scope.cart);

    };

    $scope.removeItem = function(index) {
      $scope.cart.items.splice(index, 1);

      localStorageService.remove('localStorageCart');      
      localStorageService.set('localStorageCart', $scope.cart);
    }

    $scope.getTotal = function() {
      var total = 0;
      angular.forEach($scope.cart.items, function(item) {
        total += item.qty * item.price;
      });
      return total;
    }

    

  });