// src/js/frontend/main.js

'use strict';

var app = angular.module('app', [
  'ngRoute',
  'LocalStorageModule',
  'app.users',
  'app.products',
  'app.cart'
  ])


app.controller('MainController', function($scope) {
  $scope.message = 'This is the main controller';
});


app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/views/frontend/products.html'
    })
    .when('/login', {
      templateUrl: '/views/frontend/login.html',
      controller:  'userController'
    })
    .otherwise({
      redirectTo: '/'
    });

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