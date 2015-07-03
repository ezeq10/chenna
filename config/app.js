// config/db.js

module.exports = {
  secretKey: process.env.SECRET_KEY || 'palabrasecreta',
  api:       process.env.SECRET_KEY || 'http://localhost:3000/api'
};
