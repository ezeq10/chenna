// api/models/user.js
'use strict';

// load dependencies
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cfg = require('../../config/app');
var secretKey = cfg.secretKey;

module.exports = function(mongoose) {
  
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    local:    {
      email:      { type: String, trim: true, required: true, max: 80 },
      password:   { type: String, trim: true, required: true }      
    },
    facebook: {
      id:         { type: String, max: 80 },
      tokens:     { type: String, max: 80 },
      email:      { type: String, max: 80 }
    },
    name:         { type: String, max: 80 },
    isAdmin:      { type: Boolean, default: false },
    active:       { type: Boolean, default: true },
    createdAt:    { type: Date, default: Date.now },
    lastLogin:    { type: Date }
  });

  // 
  userSchema.pre('save', function (next) {
    var user = this;

    if (! user.isModified('local.password'))
      return next();

    bcrypt.genSalt(10, function (err, salt) {
      if (err)
        return next(err);

      bcrypt.hash(user.local.password, salt, function (err, hash) {
        if (err)
          return next(err);

        user.local.password = hash;
        next();
      });
    });
  });

  userSchema.methods.comparePassword = function (pwd, cb) {
    bcrypt.compare(pwd, this.local.password, function (err, isMatch) {
      if (err)
        return cb(err);
      
      cb(null, isMatch);
    });
  };

  userSchema.methods.generateToken = function(cb) {
    var token = jwt.sign({
                  created: this.createdAt,
                  email: this.email,
                  isAdmin: this.isAdmin
                }, cfg.secretKey, { expiresInMinutes: 60 });     
    
    return cb(null, token);
  };

  return mongoose.model('User', userSchema);
};