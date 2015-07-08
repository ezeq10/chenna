// app/controllers/users.js
'use strict';

module.exports = function(app, models) {

  // models
  var User = models.User;

  return {

    findAll: function(req, res) {
      var filter = {};

      User.find(filter)
        .exec(function(err, data) {
          //console.log('data %s', JSON.stringify(data))
          if(err)
            return res.status(500).json({err: 'Internal server error'});        
          
          if(! data || data.length == 0) 
            return res.status(404).json({err: 'Not found'});
          
          return res.status(200).json({data: data})
        });      
    },

    findById: function(req, res) {
      
      if(! req.params.user_id)
        return res.status(404).json({err: 'Not found'});
      
      var id = req.params.user_id;
      
      User.findOne({_id: id}, function (err, data) {
        console.log('data %s', JSON.stringify(data))
        if(err)
          return res.status(500).json({err: 'Internal server error'});
        
        if(! data || data.length == 0) 
          return res.status(404).json({err: 'Not found'});
        
        return res.status(200).json({data: data})
      });
    },

    update: function(req, res) {
      
      if(! req.params.user_id)
        return res.status(404).json({err: 'Not found'});
      if(! req.body)
        return res.status(500).json({err: 'No data provided'});

      var id = req.params.user_id;
      var newObj = req.body;   

      User.update({_id: id}, newObj, function (err, numberAffected) {
        if(err)
          return res.status(500).json({err: 'Internal server error'});
        
        return res.status(200).json();
      });
    },

    delete: function(req, res) {
      
      if(! req.params.user_id)
        return res.status(404).json({err: 'Not found'});
      
      var id = req.params.user_id;
      
      User.remove({_id: id}, function (err) {
        if(err) 
          return res.status(500).json({err: 'Internal server error'});
        
        return res.status(200).json();
      });
    }

  }
};