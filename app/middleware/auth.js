// app/middleware/auth

// load dependencies
var jwt = require('jsonwebtoken');
var cfg = require('../../config/app');

// save this context
var _this = this;

/**
 * Router middleware to check authentication
 */
exports.isAuthorized = function(req, res, next) {
  if(req.decoded.isAdmin)
    next();
  else
    return res.status(401).json({ success: false, message: 'Unauthorized'});
};
  
/**
 * Router middleware to check authentication
 */
exports.isAuthenticated = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];    
  if(token) {      
    var decoded = _this.verifyToken(token, function(err, decoded) {
      if(! decoded) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
      } else {
        // if everything is good, save to request for use in other routes          
        req.decoded = decoded;
        next();
      } 
    });
  } else {
    return res.status(403).json({ success: false, message: 'No token provided'});
  }
};

/**
 * JWT check
 */
exports.verifyToken = function(token, cb) {  
  jwt.verify(token, cfg.secretKey, function(err, decoded) {
    if (err) {
      return cb(true, null);   
    } else {
      return cb(null, decoded);
    }
  });
};