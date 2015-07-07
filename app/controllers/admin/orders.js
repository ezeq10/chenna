// app/controllers/admin/orders.js
'use strict';

// load dependencies
var request = require('request-promise');
var cfg = require('../../../config/app');

module.exports = function(app, models) {

  return {
    index: function(req, res) {
      
      var token = req.query.token || '';
      var uri = cfg.api + '/orders';
      var data;
      var err;
      
      request({ 
        uri: uri,
        headers: {'x-access-token': token}
      }).then(function(response) {
        //console.log('response: %s', response)
        var response = JSON.parse(response);
        data = response.data;    
      })
      .catch(function(error) {
        console.error('Error on API %s', error)
        err = error;
      })          
      .finally(function() {        
        res.render('admin/orders', { err: err, data: data });
      });      
    }
  }
};