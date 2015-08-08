// src/frontend/js/users/userService.js
'use strict';

angular.module('app.users')
  .factory('userService', function($http, localStorageService) {
   
    var _currentUser;

    return {

      login: function(formData, cb) {

        $http.post('/login', formData)
          .success( function(res) {

            _currentUser = {
              id:         res.profile._id,
              name:       res.profile.name,
              admin:      res.profile.isAdmin,
              adminPath:  (res.profile.isAdmin) ? '/admin/?token=' + res.token : null
            }; 

            localStorageService.set('userToken', res.token);
            localStorageService.set('userProfile', _currentUser);
            
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

            _currentUser = {
              id:         res.profile._id,
              name:       res.profile.name,
              admin:      res.profile.isAdmin,
              adminPath:  (res.profile.isAdmin) ? '/admin/?token=' * res.token : null
            };

            localStorageService.set('userToken', res.token);
            localStorageService.set('userProfile', _currentUser);
            
            return cb(null, res);
          })
          .error( function(err) {
            console.error(err)
            return cb(true, err);
          });
      },

      isAuthenticated: function() {
        return (localStorageService.get('userToken')) ? true : false;
      },

      getCurrentUser: function() {        
        return localStorageService.get('userProfile');
      },

      logout: function() {
        _currentUser = {};
        localStorageService.remove('userToken');
        localStorageService.remove('userProfile');
        return true;
      }      
      
    }

  });