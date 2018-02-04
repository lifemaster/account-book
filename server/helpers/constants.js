const fs = require('fs');

module.exports.settings = function(environment) {
  switch (environment) {
    case 'prod':
      return {
        httpPort: 80,
        httpsPort: 443,
        cert: {
          key: fs.readFileSync(`${__dirname}/../ssl/key.pem`),
          cert: fs.readFileSync(`${__dirname}/../ssl/cert.pem`)
        },
        dbURI: 'mongodb://127.0.0.1/account-book',
        jwtSecret: 'sc11deadhcbeef'
      };
    case 'dev':
      return {
        httpPort: 1234,
        dbURI: 'mongodb://127.0.0.1/account-book-dev',
        jwtSecret: 'sc11deadhcbeef',
        allowedOrigins: [ 'http://localhost:3000', 'http://localhost:5000', 'http://192.168.77.77:3000', 'http://192.168.77.77:5000' ]
      };
    case 'test':
      return {
        httpPort: 1234,
        dbURI: 'mongodb://127.0.0.1/account-book-test',
        jwtSecret: 'sc11deadhcbeef'
      };
  }
};