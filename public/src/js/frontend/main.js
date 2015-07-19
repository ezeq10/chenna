// src/js/frontend/main.js

'use strict';

var app = angular.module('app', [
  'ui.router',
  'LocalStorageModule',
  'app.users',
  'app.products',
  'app.cart'
  ])


app.controller('MainController', function($scope) {
  $scope.message = 'This is the main controller';
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
   
  $stateProvider
    .state('home', {
      url: '/home',      
      views: {        
        'main@': { 
          templateUrl: 'views/frontend/home.html'          
        },        
        'products-view@home': { 
          templateUrl: 'views/frontend/products.html',
          controller:  'productController'
        },        
        'cart-view@home': { 
          templateUrl: 'views/frontend/cart.html',
          controller:  'cartController'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {        
        'main@': { 
          templateUrl: 'views/frontend/login.html',          
          controller:  'userController'
        }
      } 
    })

    $urlRouterProvider.otherwise("/home");
}]);


app.config(['$httpProvider', function($httpProvider) {  
  $httpProvider.interceptors.push(['$q', function($q) {
      
    return {
      request: function(config) {
        config.headers = config.headers || {};
        var token = localStorage.getItem('userToken');
        //console.log(token);

        if(token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      },

      responseError: function(response) {
        //console.log('res' + response)
        return $q.reject(response);
      }
    };

  }]);
}]);