// app/models/category.js
'use strict';

module.exports = function(mongoose) {
  
  var Schema = mongoose.Schema;

  var categorySchema = new Schema({
    name:             { type: String, required: true, trim: true },
    isEnabled:        { type: Boolean, required: true, default: true }
  });

  return mongoose.model('Category', categorySchema);
};