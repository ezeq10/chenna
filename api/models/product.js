// api/models/product.js
'use strict';

module.exports = function(mongoose) {
  
  var Schema = mongoose.Schema;

  var productSchema = new Schema({
    name:             { type: String, required: true, trim: true },
    category:         { type: String, required: true },
    unit:             { type: String },
    description:      { type: String },
    longDescription:  { type: String },
    images:           [{ name: { type: String }, text: { type: String }, date: { type: Date } }],
    price:            [{ unit: { type: String }, value: { type: Number } }],
    defaultWeight:    { type: Number },
    delta:            { type: Number },
    isEnabled:        { type: Boolean, required: true, default: true },
    createdAt:        { type: Date, default: Date.now }
  });

  return mongoose.model('Product', productSchema);
};