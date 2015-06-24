// api/controllers/admin/admin.js
'use strict';

module.exports = function(app, models) {

  // models
  var User = models.User;

  return {

    index: function(req, res) {

      if (req.method === 'GET') {
        return res.status(200).json({ message: 'GET' });
      } else {
        return res.status(200).json({ message: 'POST' });
      }
    }
  }
};