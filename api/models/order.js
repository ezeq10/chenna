// api/models/order.js
'use strict';

module.exports = function(mongoose) {
  
  var Schema = mongoose.Schema;

  var orderSchema = new Schema({
    user:             { type: Schema.ObjectId, ref: 'User' },        
    products:         [{ type: Schema.ObjectId, ref: 'Product' }],
    code:             { type: String },
    gift:             { type: String },
    subtotal:         { type: Number, default: 0.00 },
    shipping:         { type: Number, default: 0.00 },
    total:            { type: Number, default: 0.00 },
    comments:         { type: String },
    delivered:        { type: Boolean, default: false },
    createdAt:        { type: Date, default: Date.now }
  });

  return mongoose.model('Order', orderSchema);
};