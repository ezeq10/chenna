// test/api/categories.js
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
var Category = mongoose.model('Category');
var User = mongoose.model('User');

//Testing
describe('Categories API', function () {
  
  var lastInsertedId;
  var userObj;
  var token = null;
  var userId;

  // datasets
  var categoryObj;
  var categoryObj2Update;

  before( function (done) {

    userObj = {
      email: 'user2@user2.com',
      password: 'password'
    };

    // create test order dataset
    categoryObj = {
      name: 'Fruits'
    };
    categoryObj2Update = {
      name: 'Clothes'
    };

    // register user
    supertest(app)
      .post('/register')
      .send(userObj)
      .expect(201)
      .end(function(err, res) {
        if(err)
          return done(err);

          // login user
          supertest(app)
            .post('/login')
            .send(userObj)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if(err)
                return done(err);
              
              expect(res).to.exist;
              expect(res.body).to.have.property('token');
              expect(res.body).to.have.property('profile');
              expect(res.body.token).to.exist;
              expect(res.body.profile).to.exist;
              
              // save user token
              token = res.body.token;
              userId = res.body.profile._id;

              return done();
            });
      });    
  });


  it('should save a category data object', function (done) {
    supertest(app)
      .post('/api/categories')
      .set('x-access-token', token)
      .send(categoryObj)
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
  
  it('should get an array of categories', function (done) {
    supertest(app)
      .get('/api/categories')
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
  
  it('should get a category object by id', function (done) {
    supertest(app)
      .get('/api/categories/'+ lastInsertedId)
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
  
  it('should update a category object', function (done) {
    supertest(app)
      .put('/api/categories/'+ lastInsertedId)
      .set('x-access-token', token)
      .send(categoryObj2Update)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        return done();
      });
  });
  
  it('should delete an category object', function (done) {
    supertest(app)
      .delete('/api/categories/'+ lastInsertedId)
      .set('x-access-token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);
      
        return done();
      });
  }); 
  
  after( function (done) {
    Category.remove().exec();
    User.remove().exec();
    done();
  });
});