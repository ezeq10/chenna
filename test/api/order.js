// test/api/order.js
'use strict';

// force the test environment to 'test'
process.env.NODE_ENV = 'test';

// load modules
var supertest = require('supertest');
var expect = require('chai').expect;
  
// require app
var app = require('../../server');

// global datasets
var testObj;
var testObj2Update;
var lastInsertedId;

//Testing
describe('Order API', function () {
  
  before( function (done) {
    
    testObj = {
      user: '1',
      products: [],
      code: 1234,
      gift: {},
      subtotal: 12,
      shipping: 5,
      total: 17,
      comments: 'Entregar temprano'
    };
    testObj2Update = {
      user: '1',
      products: [],
      code: 1235,
      gift: {},
      subtotal: 10,
      shipping: 2,
      total: 12,
      comments: 'Entregar tarde'
    };

    return done();
  });

  it('should save order data object', function (done) {
    supertest(app)
      .post('/api/orders')
      .send(testObj)
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
  /*
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
      .send(testObj2Update)
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
  */
});