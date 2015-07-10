// app/controllers/products.js
'use strict';

module.exports = function(app, models) {

  // models
  var Product = models.Product;

  return {

    findAll: function(req, res) {
      //console.log('[products.findAll] params: %s', JSON.stringify(req.params))      
      var filter = {};

      if(req.params.category && req.params.category != 'null') {
        filter.category = req.params.category;
      }      
      //console.log('[message.findAll] filter: %s',JSON.stringify(filter))

      Product.find(filter).exec(function(err, data) {
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
      if(! req.params.product_id)
        return res.status(404).json({err: 'Not found'});
      
      var id = req.params.product_id;
      
      Product.findOne({_id: id}, function (err, data) {
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

      Product.create(newObj, function(err, data) {
        if(err) 
          return res.status(500).json({err: 'Internal server error'});

        return res.status(201).json({data: {id: data._id}});
      });      
    },
    
    update: function(req, res) {
      //console.log('[products.update] params: %s %s', JSON.stringify(req.params), JSON.stringify(req.body))
      if(! req.params.product_id)
        return res.status(404).json({err: 'Not found'});
      if(! req.body)
        return res.status(500).json({err: 'No data provided'});

      var id = req.params.product_id;
      var newObj = req.body;
      if(! req.body.isEnabled)
        newObj.isEnabled = false;

      Product.update({_id: id}, newObj, function (err, numberAffected) {
        if(err)
          return res.status(500).json({err: 'Internal server error'});
        
        return res.status(200).json();
      });
    },

    delete: function(req, res) {      
      //console.log('[products.delete] params: %s', JSON.stringify(req.params))
      if(! req.params.product_id)
        return res.status(404).json({err: 'Not found'});
      
      var id = req.params.product_id;
      
      Product.remove({_id: id}, function (err) {
        if(err) 
          return res.status(500).json({err: 'Internal server error'});
        
        return res.status(200).json();
      });
    },

    addImage: function(req, res) {      
      //console.log('[products.addImage] params: %s %s %s', JSON.stringify(req.params), JSON.stringify(req.files), JSON.stringify(req.body))
      if(! req.params.product_id)
        return res.status(404).json({err: 'Not found'});
      
      var id = req.params.product_id;
      var imageObj = {
        name: req.files.photo.name,
        text: req.body.text
      }

      Product.update({_id: id}, { $push: {images: imageObj} }, function (err, numberAffected) {
        if(err)
          return res.status(500).json({err: 'Internal server error'});
        
        return res.status(200).json();
      });
    },

    delImage: function(req, res) {      
      //console.log('[products.delImage] params: %s', JSON.stringify(req.params))
      if(! req.params.product_id)
        return res.status(404).json({err: 'Not found'});
      
      var id = req.params.product_id;

      Product.update({_id: id}, { $pop: {images: 1} }, function (err, numberAffected) {
        if(err)
          return res.status(500).json({err: 'Internal server error'});
        
        return res.status(200).json();
      });
    }  


  }
};