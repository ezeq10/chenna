// app/controllers/admin/admin.js
'use strict';

module.exports = function(app, models) {

  // models
  var User = models.User;

  return {

    index: function(req, res) {
      return res.render('admin/main');
    }
  }
};