// src/js/frontend/users/userService.js
'use strict';

angular.module('app.users')
  .factory('userService', function($http) {
      
    return {

      login: function(formData, cb) {

        $http.post('/login', formData)
          .success( function(res) {            
            return cb(null, res);
          })
          .error( function(err) {
            console.error(err)
            return cb(true, err);
          });
      },

      register: function(formData, cb) {

        $http.post('/register', formData)
          .success( function(res) {            
            return cb(null, res);
          })
          .error( function(err) {
            console.error(err)
            return cb(true, err);
          });
      }
      
    }

  });