// src/frontend/js/app.js
'use strict';

/**
 * Load main dependencies
 */
var app = angular.module('app', [
  'ui.router',
  'LocalStorageModule',
  'app.users',
  'app.products',
  'app.cart',
  'app.checkout',
  'app.main'
  ])


/**
 * Angular UI routing
 */
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
   
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'mainController',     
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
    .state('signup', {
      url: '/signup',
      views: {        
        'main@': { 
          templateUrl: 'views/frontend/signup.html',          
          controller:  'userController'
        }
      } 
    })
    .state('account', {
      url: '/account',
      views: {        
        'main@': { 
          templateUrl: 'views/frontend/login.html',          
          controller:  'userController'
        }
      } 
    })
    .state('checkout', {
      url: '/checkout',
      views: {        
        'main@': { 
          templateUrl: 'views/frontend/checkout.html',
          controller:  'checkoutController'
        }
      } 
    })
  
    $urlRouterProvider.otherwise("/home");
}]);



/**
 * HTTP Interceptor, used to attach token data on every request
 */
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