// routes.js
'use strict';

// load dependencies
var auth = require('./middleware/auth');

module.exports = function(app, router, controllers) {
  
  /**
   * Products API endpoints
   */
  router.delete('/api/products/:product_id/images/:image_id', auth.isAuthenticated, controllers.products.delImage); 
  router.post('/api/products/:product_id/images', auth.isAuthenticated, controllers.products.addImage); 
  router.get('/api/products/search/:category', controllers.products.findAll);
  router.delete('/api/products/:product_id', auth.isAuthenticated, controllers.products.delete);
  router.put('/api/products/:product_id', auth.isAuthenticated, controllers.products.update);
  router.get('/api/products/:product_id', controllers.products.findById);
  router.post('/api/products', auth.isAuthenticated, controllers.products.add);
  router.get('/api/products', controllers.products.findAll);

  /**
   * Orders API endpoints
   */  
  router.delete('/api/orders/:order_id', auth.isAuthenticated, controllers.orders.delete);
  router.put('/api/orders/:order_id', auth.isAuthenticated, controllers.orders.update);
  router.get('/api/orders/:order_id', auth.isAuthenticated, controllers.orders.findById);  
  router.post('/api/orders', auth.isAuthenticated, controllers.orders.add);
  router.get('/api/orders', auth.isAuthenticated, controllers.orders.findAll);

  /**
   * Users API endpoints
   */
  router.delete('/api/users/:user_id', auth.isAuthenticated, auth.isAuthorized, controllers.users.delete);
  router.put('/api/users/:user_id', auth.isAuthenticated, auth.isAuthorized, controllers.users.update);
  router.get('/api/users/:user_id', auth.isAuthenticated, auth.isAuthorized, controllers.users.findById);
  router.get('/api/users', auth.isAuthenticated, auth.isAuthorized, controllers.users.findAll);


  /**
   * Auth (using JWT)
   */
  app.post('/register', controllers.auth.create);
  app.post('/login', controllers.auth.login);

  /**
   * Admin routes
   */
  router.get('/admin/products', auth.isAuthenticated, auth.isAuthorized, controllers.admin_products.index); 
  router.get('/admin/orders', auth.isAuthenticated, auth.isAuthorized, controllers.admin_orders.index); 
  router.get('/admin/users', auth.isAuthenticated, auth.isAuthorized, controllers.admin_users.index);
  router.get('/admin', auth.isAuthenticated, auth.isAuthorized, controllers.admin.index);

  /**
   * Main route
   */
  router.get('/', function(req, res) { 
    res.render('index');
  });

  app.use(router);
};