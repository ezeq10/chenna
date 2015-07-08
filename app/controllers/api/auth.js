// app/controllers/orders.js
'use strict';

module.exports = function(app, models) {

  // models
  var User = models.User;

  return {

    create: function(req, res) {

      var name    = req.body.name;
      var email    = req.body.email;
      var password = req.body.password;
      
      if(!name && !email && !password)  
        return res.status(500).json({err: 'No data provided'});

      User.findOne({'local.email': email}, function (err, user) {
        if(err)
          return res.status(500).json({err: 'Internal server error'});
        
        if(user) 
          return res.status(500).json({err: 'Email already exists'});
        
        var newUser = {
          'name': name,
          'local.email': email,
          'local.password': password
        };

        User.create(newUser, function (err, user) {
          if(err)
            return res.status(500).json({err: 'Internal server error'});

          // use instance methods
          user.generateToken(function (err, token) {
            if(err)
              return res.status(500).json({err: 'Internal server error'});

            return res.status(201).json({token: token});
          });          
        });  

      });
    },

    login: function(req, res) {
      
      var email    = req.body.email;
      var password = req.body.password;
      
      if(!email && !password)  
        return res.status(500).json({err: 'No data provided'});

      User.findOne({'local.email': email}, function (err, user) {
        if(err)
          return res.status(500).json({err: 'Internal server error'});
        
        if(! user) 
          return res.status(500).json({err: 'Email does not exists'});

        // use instance methods
        user.comparePassword(password, function (err, isMatch) {
          if(! isMatch)
            return res.status(500).json({err: 'Incorrect password'});

          user.generateToken(function (err, token) {
            if(err)
              return res.status(500).json({err: 'Internal server error'});

            return res.status(200).json({token: token, profile: user});
          });
        
        });       

      });      
    
    }

  }
};