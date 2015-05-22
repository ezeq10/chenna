// config/db.js

var mongodb_user = process.env.MONGODB_USER;
var mongodb_passwd = process.env.MONGODB_PASSWD;

module.exports = {

  db: {
    production: 'mongodb://' + mongodb_user + ':' + mongodb_passwd + '@127.0.0.1:27017/elchango_prod',
    development: 'mongodb://localhost:27017/elchango_dev',
    test:        'mongodb://localhost:27017/elchango_test'
  }

};
