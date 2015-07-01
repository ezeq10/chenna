// routes.js
'use strict';

// load dependencies
var auth = require('./middleware/auth');

module.exports = function(app, router, controllers) {
  /**
   * Auth (using JWT)
   */
  app.post('/register', controllers.auth.create);
  app.post('/login', controllers.auth.login);

  /**
   * Admin routes
   */
  router.get('/admin', auth.isAuthenticated, auth.isAuthorized, controllers.admin.index);
  

  /**
   * Products API endpoints
   */
  router.get('/api/products/search/:category', auth.isAuthenticated, controllers.products.findAll);
  router.delete('/api/products/:product_id', auth.isAuthenticated, controllers.products.delete);
  router.put('/api/products/:product_id', auth.isAuthenticated, controllers.products.update);
  router.get('/api/products/:product_id', auth.isAuthenticated, controllers.products.findById);
  router.post('/api/products', auth.isAuthenticated, controllers.products.add);
  router.get('/api/products', auth.isAuthenticated, controllers.products.findAll);

  /**
   * Orders API endpoints
   */  
  router.delete('/api/orders/:order_id', auth.isAuthenticated, controllers.orders.delete);
  router.put('/api/orders/:order_id', auth.isAuthenticated, controllers.orders.update);
  router.get('/api/orders/:order_id', auth.isAuthenticated, controllers.orders.findById);  
  router.post('/api/orders', auth.isAuthenticated, controllers.orders.add);
  router.get('/api/orders', auth.isAuthenticated, controllers.orders.findAll);

  app.use(router);
};