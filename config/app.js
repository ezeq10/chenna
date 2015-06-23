// config/db.js

var secretKey = process.env.SECRET_KEY;

module.exports = {
  secretKey: secretKey || 'palabrasecreta'
};
