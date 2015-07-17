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