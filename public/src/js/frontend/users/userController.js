// src/js/frontend/users/userController.js
'use strict';

angular.module('app.users', [])
  .controller('userController', function($rootScope, $scope, userService, localStorageService) {

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
          console.log(res)
          localStorageService.set('userToken', res.token);
          localStorageService.set('userProfile', res.profile);
          window.location = "/"; 
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
          localStorageService.set('userToken', res.token);
          localStorageService.set('userProfile', res.profile);
          window.location = "/"; 
        }        
      });
    };

    $scope.profile = function() {
      var profile = localStorageService.get('userProfile');
      console.log(profile)
      if(! profile) {
        $rootScope.error = 'Failed to fetch details';
        return false;
      } else {
        console.log('User Profile'+ profile)
      }
    };

    $scope.logout = function() {
      localStorageService.remove('userToken');
      localStorageService.remove('userProfile');
      window.location = "/";
    };
});