// routes.js
'use strict';

module.exports = function(app, router, controllers) {

  // load dependencies
  var jwt = require('jsonwebtoken');
  var cfg = require('../config/app');

  /**
   * Auth (using JWT)
   */
  app.post('/register', controllers.auth.create);
  app.post('/login', controllers.auth.login);


  /**
   * Router middleware to verify a token
   */
  router.use(function(req, res, next) {    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {      
      jwt.verify(token, cfg.secretKey, function(err, decoded) {
        if (err) {
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
  });


  /**
   * Products endpoints
   */
  router.get('/api/products/search/:category', controllers.products.findAll)
  router.delete('/api/products/:product_id', controllers.products.delete)
  router.put('/api/products/:product_id', controllers.products.update)
  router.get('/api/products/:product_id', controllers.products.findById)  
  router.post('/api/products', controllers.products.add);
  router.get('/api/products', controllers.products.findAll);

  /**
   * Order endpoints
   */  
  router.delete('/api/orders/:order_id', controllers.orders.delete)
  router.put('/api/orders/:order_id', controllers.orders.update)
  router.get('/api/orders/:order_id', controllers.orders.findById)  
  router.post('/api/orders', controllers.orders.add);
  router.get('/api/orders', controllers.orders.findAll);   

  
  app.use(router);
};


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
