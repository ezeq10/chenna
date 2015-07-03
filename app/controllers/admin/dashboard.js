// app/controllers/admin/dashboard.js
'use strict';

module.exports = function(app, models) {

  return {
    index: function(req, res) {       
      return res.render('admin/index');
    }
  }
};