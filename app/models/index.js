// app/models/index.js
'use strict';

module.exports = function(mongoose) {
  return {
    User:     require('./user')(mongoose),
    Product:  require('./product')(mongoose),
    Order:    require('./order')(mongoose)
  }
};