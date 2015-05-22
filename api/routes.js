// routes.js
'use strict';

module.exports = function(app, router, controllers) {

  // Products endpoints  
  router.delete('/api/products/:product_id', controllers.products.delete)
  router.put('/api/products/:product_id', controllers.products.update)
  router.get('/api/products/:product_id', controllers.products.findById)  
  router.post('/api/products', controllers.products.add);
  router.get('/api/products', controllers.products.findAll);

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
