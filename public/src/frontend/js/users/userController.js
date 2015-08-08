// src/frontend/js/users/userController.js
'use strict';

angular.module('app.users', [])
  .controller('userController', function($rootScope, $scope, $state, userService, localStorageService) {

    $scope.login = function() {
      var formData = {
        email:    $scope.email,
        password: $scope.password
      }
      userService.login( formData, function (err, res) {
        if(err) {      
          $rootScope.error = 'Login error';    
          return false;
        } else {
          $state.go('home');
        }        
      });
    };

    $scope.signup = function() {
      var formData = {
        name:     $scope.name,
        email:    $scope.email,
        password: $scope.password
      }
      userService.register( formData, function (err, res) {
        if(err) {
          $rootScope.error = 'Signup error'; 
          return false;
        } else {
          $state.go('home');
        }        
      });
    };
});