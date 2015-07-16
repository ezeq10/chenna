// src/js/frontend/main.js

'use strict';

var app = angular.module('app', [
  'ngRoute',
  'app.products'
  ])

app.controller('MainController', function($scope) {
  $scope.message = 'This is the main controller';
});