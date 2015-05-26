// test/api/product.js
'use strict';

// force the test environment to 'test'
process.env.NODE_ENV = 'test';

// load dependencies
var supertest = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');  

// server
var app = require('../../server');

// models
var Product = mongoose.model('Product');

// global datasets
var productObj;
var productObj2Update;
var lastInsertedId;

//Testing
describe('Products API', function () {

  before( function (done) {
    
    productObj = {
      name: 'Manzana',
      category: 'fruits',
      unit: ['Unidad','Peso'],
      description: 'Es una manzana',
      longDescription: 'Es una manzana especial',
      images: [{ name: 'manzana01.jpg', text: 'texto de imagen'}],
      price: [{ unit: 'Unidad', value: 2}, { unit: 'Peso', value: 15 }],
      defWeight: 1,
      delta: 0.25
    };
    productObj2Update = {
      name: 'Manzana de lujo',
      category: 'fruits',
      unit: ['Unidad','Peso'],
      description: 'Es una manzana de lujo',
      longDescription: 'Es una manzana especial y de lujo',
      images: [{ name: 'manzana02.jpg', text: 'texto de imagen'}],
      price: [{ unit: 'Unidad', value: 3}, { unit: 'Peso', value: 16 }],
      defWeight: 1,
      delta: 0.30
    };

    return done();
  });

  it('should save product data object', function (done) {
    supertest(app)
      .post('/api/products')
      .send(productObj)
      .expect(201)
      .end(function(err, res) {
        if(err)
          return done(err);
        
        expect(res).to.exist;
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        
        // get last inserted id
        lastInsertedId = res.body.data.id;
        //console.log('last inserted: %s', lastInsertedId)
        return done();
      });
  });

  it('should get an array of products', function (done) {
    supertest(app)
      .get('/api/products')
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        expect(res.body.data).to.exist;
        expect(res.body.data[0]).to.have.property('_id');
        return done();
      });
  });
  
  it('should get a product object by id', function (done) {
    supertest(app)
      .get('/api/products/'+ lastInsertedId)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        expect(res.body.data).to.exist;
        expect(res.body.data).to.have.property('_id');          
        return done();
      });
  });

  it('should update a product object', function(done) {
    supertest(app)
      .put('/api/products/'+ lastInsertedId)
      .send(productObj2Update)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        return done();
      });
  });
  
  it('should get a product object by specific category', function(done) {
    supertest(app)
      .get('/api/products/search/fruits')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        expect(res.body.data).to.exist;
        expect(res.body.data[0]).to.have.property('_id');        
        return done();
      });
  });

  it('should delete a product object', function(done) {
    supertest(app)
      .delete('/api/products/'+ lastInsertedId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        return done();
      });
  });

  /*
  after(function(done) {
    Product.remove().exec();
    done();
  });
  */
});