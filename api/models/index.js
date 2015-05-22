// api/models/index.js
'use strict';

module.exports = function(mongoose) {

  return {
    Product: require('./product')(mongoose)
  }

};