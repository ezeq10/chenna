// app/controllers/orders.js
'use strict';

module.exports = function(app, models) {

  // models
  var Order = models.Order;

  return {

    findAll: function(req, res) {
      //console.log('[products.findAll] params: %s', JSON.stringify(req.params))      
      var filter = {};
      /*
      if(req.params.category && req.params.category != 'null') {
        filter.category = req.params.category;
      }*/      
      //console.log('[message.findAll] filter: %s',JSON.stringify(filter))

      Order.find(filter)
        .populate('user')
        .populate('products')
        .exec(function(err, data) {
          //console.log('data %s', JSON.stringify(data))
          if(err)
            return res.status(500).json({err: 'Internal server error'});        
          
          if(! data || data.length == 0) 
            return res.status(404).json({err: 'Not found'});
          
          return res.status(200).json({data: data})
        });      
    },

    findById: function(req, res) {
      //console.log('[products.findById] params: %s', JSON.stringify(req.params))
      if(! req.params.order_id)
        return res.status(404).json({err: 'Not found'});
      
      var id = req.params.order_id;
      
      Order.findOne({_id: id})
        .populate('user')
        .populate('products')
        .exec( function (err, data) {
          //console.log('data %s', JSON.stringify(data))
          if(err)
            return res.status(500).json({err: 'Internal server error'});
          
          if(! data || data.length == 0) 
            return res.status(404).json({err: 'Not found'});
          
          return res.status(200).json({data: data})
        });
    },

    add: function(req, res) {
    	//console.log('[products.add] params: %s', JSON.stringify(req.body))
      if(! req.body)
        return res.status(500).json({err: 'No data provided'});

      var newObj = req.body;

      Order.create(newObj, function(err, data) {
        if(err) {
          console.error(err)
          return res.status(500).json({err: 'Internal server error'});
        }
        return res.status(201).json({data: {id: data._id}});
      });      
    },
    
    update: function(req, res) {
      //console.log('[products.update] params: %s %s', JSON.stringify(req.params), JSON.stringify(req.body))
      if(! req.params.order_id)
        return res.status(404).json({err: 'Not found'});
      if(! req.body)
        return res.status(500).json({err: 'No data provided'});

      var id = req.params.order_id;
      var newObj = req.body;   

      Order.update({_id: id}, newObj, function (err, numberAffected) {
        if(err)
          return res.status(500).json({err: 'Internal server error'});
        
        return res.status(200).json();
      });
    },

    delete: function(req, res) {      
      //console.log('[products.delete] params: %s', JSON.stringify(req.params))
      if(! req.params.order_id)
        return res.status(404).json({err: 'Not found'});
      
      var id = req.params.order_id;
      
      Order.remove({_id: id}, function (err) {
        if(err) 
          return res.status(500).json({err: 'Internal server error'});
        
        return res.status(200).json();
      });
    }    
  }
};