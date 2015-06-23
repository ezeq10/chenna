// api/controllers/index.js
'use strict';

module.exports = function(app, models) {  
  return {
    auth:     require('./auth')(app, models),
    products: require('./products')(app, models),
    orders:   require('./orders')(app, models),

  }

};