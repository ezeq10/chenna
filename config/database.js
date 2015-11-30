// config/db.js

var mongodb_user = process.env.MONGODB_USER;
var mongodb_passwd = process.env.MONGODB_PASSWD;
var mongodb_server = process.env.MONGODB_HOST;
var mongodb_port = process.env.MONGODB_PORT;
var mongodb_name = process.env.MONGODB_NAME;

module.exports = {

  db: {
    production: 'mongodb://' + mongodb_user + ':' + mongodb_passwd + '@' + mongodb_server + ':' + mongodb_port + '/' + mongodb_name,
    development: 'mongodb://localhost:27017/elchango_dev',
    test:        'mongodb://localhost:27017/elchango_test'
  }

};
