// test/api/order.js
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
var Order = mongoose.model('Order');
var User = mongoose.model('User');

//Testing
describe('Order API', function () {
  
  var lastInsertedId;
  var token = null;

  // datasets
  var orderObj;
  var orderObj2Update;  
  var productObj;
  var productObjId;

  before( function (done) {
    
    // create test product dataset
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
    Product.create(productObj, function (err, data) {
      if((err) && (! data))
        done(err);

      productObjId = data._id;
      //console.log('productObjId: %s', productObjId);
    });

    orderObj = {
      user: '1',
      products: [],
      code: 1234,
      gift: {},
      subtotal: 12,
      shipping: 5,
      total: 17,
      comments: 'Entregar temprano'
    };
    orderObj2Update = {
      user: '1',
      products: [],
      code: 1235,
      gift: {},
      subtotal: 10,
      shipping: 2,
      total: 12,
      comments: 'Entregar tarde'
    };

    // create test user
    var userObj = {
      email: 'user1@user1.com',
      password: 'password'
    };
    // get user token
    supertest(app)
      .post('/register')
      .send(userObj)
      .expect(201)
      .end(function(err, res) {
        if(err)
          return done(err);
        
        token = res.body.token;        
        return done();
      });
  });

  it('should save an order data object', function (done) {
    supertest(app)
      .post('/api/orders')
      .set('x-access-token', token)
      .send(orderObj)
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
  
  it('should get an array of orders', function (done) {
    supertest(app)
      .get('/api/orders')
      .set('x-access-token', token)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        expect(res.body.data).to.exist;
        expect(res.body.data[0]).to.have.property('_id');
        return done();
      });
  });
  
  it('should get an order object by id', function (done) {
    supertest(app)
      .get('/api/orders/'+ lastInsertedId)
      .set('x-access-token', token)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        expect(res.body.data).to.exist;
        expect(res.body.data).to.have.property('_id');          
        return done();
      });
  });
  
  it('should update an order object', function(done) {
    supertest(app)
      .put('/api/orders/'+ lastInsertedId)
      .set('x-access-token', token)
      .send(orderObj2Update)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        return done();
      });
  });

  it('should delete an order object', function(done) {
    supertest(app)
      .delete('/api/orders/'+ lastInsertedId)
      .set('x-access-token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        return done();
      });
  });

  after(function(done) {
    Order.remove().exec();
    User.remove().exec();
    done();
  });
});