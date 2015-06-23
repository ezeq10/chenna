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
   * Products endpoints
   */
  router.get('/api/products/search/:category', isAuthenticated, controllers.products.findAll);
  router.delete('/api/products/:product_id', isAuthenticated, controllers.products.delete);
  router.put('/api/products/:product_id', isAuthenticated, controllers.products.update);
  router.get('/api/products/:product_id', isAuthenticated, controllers.products.findById);
  router.post('/api/products', isAuthenticated, controllers.products.add);
  router.get('/api/products', isAuthenticated, controllers.products.findAll);

  /**
   * Order endpoints
   */  
  router.delete('/api/orders/:order_id', isAuthenticated, controllers.orders.delete);
  router.put('/api/orders/:order_id', isAuthenticated, controllers.orders.update);
  router.get('/api/orders/:order_id', isAuthenticated, controllers.orders.findById);  
  router.post('/api/orders', isAuthenticated, controllers.orders.add);
  router.get('/api/orders', isAuthenticated, controllers.orders.findAll);   

  app.use(router);
};


/**
 * Router middleware to verify a token
 */
function isAuthenticated(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {      
    jwt.verify(token, cfg.secretKey, function(err, decoded) {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        //console.log(decoded)   
        next();
      }
    });
  } else {
    return res.status(403).json({ success: false, message: 'No token provided'});
  }
}

/*
function isAuthenticated(req, res, next) {
  jwt({secret: cfg.secretKey});
  next();
}
*/
/*
function requireAuthentication(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  //if (ip === '127.0.0.1')
    next();
  //else res.status(401).send('Unauthorized');    
}
*/
