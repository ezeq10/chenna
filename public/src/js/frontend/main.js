// src/js/frontend/main.js

'use strict';

var app = angular.module('app', [
  'ngRoute',
  'LocalStorageModule',
  'app.products',
  'app.cart'
  ])

app.controller('MainController', function($scope) {
  $scope.message = 'This is the main controller';
});


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