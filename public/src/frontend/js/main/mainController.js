// src/frontend/js/main/mainController.js
'use strict';

angular.module('app.main', [])
  .controller('mainController', function ($scope, $rootScope, $state, userService) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { 
      $scope.getCurrentUser();  
    });

    $scope.getCurrentUser = function() {
      $scope.currentUser = userService.getCurrentUser();
    };

    $scope.isAuthenticated = function() {
      return userService.isAuthenticated();
    };

    $scope.logout = function() {
      userService.logout();
      $scope.currentUser = {};
      $state.go('home');
    };
  
  });


