// routes.js
'use strict';

module.exports = function(app, router, controllers) {

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
function requireAuthentication(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  //if (ip === '127.0.0.1')
    next();
  //else res.status(401).send('Unauthorized');    
}
*/
