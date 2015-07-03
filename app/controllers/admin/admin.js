// app/controllers/admin/admin.js
'use strict';

module.exports = function(app, models) {

  return {
    index: function(req, res) {       
      return res.render('admin/main');
    }
  }
};