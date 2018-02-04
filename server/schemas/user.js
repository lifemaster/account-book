const crypto = require('crypto');
const mongoose = require('../helpers/mongoDB');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  },
  activeTokens: {
    type: [String],
    default: []
  },
  created: {
    type: Number,
    default: Date.now()
  }
});

userSchema.methods.encryptPassword = function(password) {
  return crypto.Hmac('sha1', this.salt).update(password).digest('hex');
}

userSchema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this.password;
  });

userSchema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
}

userSchema.methods.addToken = function(token) {
  this.activeTokens.push(token);
  return this.save(); // => Promise
}

userSchema.methods.removeToken = function(token) {
  const index = this.activeTokens.indexOf(token);
  if(index >= 0) {
    this.activeTokens.splice(index, 1);
    return this.save(); // Promise
  }
  else {
    return new Promise((resolve, reject) => reject('Token was not found'));
  }
}

userSchema.methods.checkToken = function(token) {
  return this.activeTokens.indexOf(token) >= 0;
}

module.exports = mongoose.model('User', userSchema);