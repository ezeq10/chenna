// app/controllers/index.js
'use strict';

module.exports = function(app, models) {  
  return {
    auth:             require('./api/auth')(app, models),
    products:         require('./api/products')(app, models),
    orders:           require('./api/orders')(app, models),
    admin:            require('./admin/dashboard')(app, models),
    admin_products:   require('./admin/products')(app, models),
    admin_orders:     require('./admin/orders')(app, models),
  }

};