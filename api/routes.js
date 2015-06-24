// routes.js
'use strict';

// load dependencies
var jwt = require('jsonwebtoken');
var cfg = require('../config/app');

module.exports = function(app, router, controllers) {
  /**
   * Auth (using JWT)
   */
  app.post('/register', controllers.auth.create);
  app.post('/login', controllers.auth.login);


  /**
   * Admin routes
   */
  router.get('/admin', isAuthenticated, isAuthorized, controllers.admin.index);
  



  /**
   * Products API endpoints
   */
  router.get('/api/products/search/:category', isAuthenticated, controllers.products.findAll);
  router.delete('/api/products/:product_id', isAuthenticated, controllers.products.delete);
  router.put('/api/products/:product_id', isAuthenticated, controllers.products.update);
  router.get('/api/products/:product_id', isAuthenticated, controllers.products.findById);
  router.post('/api/products', isAuthenticated, controllers.products.add);
  router.get('/api/products', isAuthenticated, controllers.products.findAll);

  /**
   * Orders API endpoints
   */  
  router.delete('/api/orders/:order_id', isAuthenticated, controllers.orders.delete);
  router.put('/api/orders/:order_id', isAuthenticated, controllers.orders.update);
  router.get('/api/orders/:order_id', isAuthenticated, controllers.orders.findById);  
  router.post('/api/orders', isAuthenticated, controllers.orders.add);
  router.get('/api/orders', isAuthenticated, controllers.orders.findAll);

  app.use(router);
};


/**
 * Router middleware to check authentication
 */
function isAuthorized(req, res, next) {
  if(req.decoded.isAdmin)
    next();
  else
    return res.status(401).json({ success: false, message: 'Unauthorized'});
}

/**
 * Router middleware to check authentication
 */
function isAuthenticated(req, res, next) {  
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    var decoded = verifyToken(token, function(err, decoded) {      
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
}

/**
 * JWT check
 */
function verifyToken(token, cb) {  
  jwt.verify(token, cfg.secretKey, function(err, decoded) {
    if (err) {
      return cb(true, null);   
    } else {
      return cb(null, decoded);
    }
  });
}