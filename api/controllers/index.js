// api/controllers/index.js
'use strict';

module.exports = function(app, models) {  
  return {
    products: require('./products')(app, models),
    orders:   require('./orders')(app, models)
  }

};