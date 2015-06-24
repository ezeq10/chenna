// test/api/auth.js
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
var User = mongoose.model('User');

// global
var userObj;
var userToken;
var adminObj;
var adminToken;

//Testing
describe('Auth user API', function () {
  
  before( function (done) {
    // create test user
    userObj = {
      email: 'user1@user1.com',
      password: 'password'
    };

    // create test admin
    adminObj = {
      'local.email': 'admin@admin.com',
      'local.password': 'password',
      isAdmin: true
    };

    User.create(adminObj, function (err, user) {
      if(err)
        return done(err);

      var token = user.generateToken(function (err, token) {
        if(err)
          return done(err);

        // save admin token
        adminToken = token;        
      });
    });

    return done();
  });

  it('should register user', function (done) {
    supertest(app)
      .post('/register')
      .send(userObj)
      .expect(201)
      .end(function(err, res) {
        if(err)
          return done(err);
        
        expect(res).to.exist;
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.exist;
        
        return done();
      });
  });
  
  it('should login user', function(done) {
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
        expect(res.body.token).to.exist;
        
        // save user token
        userToken = res.body.token;        
        return done();
      });
  });

  it('should reject admin section for common user', function(done) {
    supertest(app)
      .get('/admin')
      .set('x-access-token', userToken)
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err, res) {
        if(err)
          return done(err);

        expect(res).to.exist;      
        return done();
      });
  });

  it('should render admin dashboard for admin user', function(done) {
    supertest(app)
      .get('/admin')
      .set('x-access-token', adminToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err)
          return done(err);

        expect(res).to.exist;      
        return done();
      });
  });

  after(function(done) {
    User.remove().exec();
    done();
  });

});