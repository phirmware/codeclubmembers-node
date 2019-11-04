"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = require("mongoose");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 2,
    maxlength: 15,
    required: true
  },
  password: {
    type: String,
    lowercase: true,
    required: true,
    minlength: 4
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    trim: true
  },
  display_image: {
    type: String,
    required: true,
    trim: true
  },
  power_level: {
    type: String,
    required: true,
    trim: true,
    default: 'genin'
  },
  power_level_rating: {
    type: Number,
    required: true,
    default: 0
  },
  ranking: {
    type: String,
    required: true,
    trim: true,
    default: 'new'
  },
  ranking_rating: {
    type: Number,
    required: true,
    default: 0
  },
  number_of_posts: {
    type: Number,
    required: true,
    default: 0
  },
  number_of_likes: {
    type: Number,
    required: true,
    default: 0
  },
  number_of_stars: {
    type: Number,
    required: true,
    default: 0
  }
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  _bcrypt.default.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err);
    } else {
      this.password = hash;
      next();
    }
  });
});

userSchema.methods.checkPassword = function (password) {
  const hashPassword = this.password;
  return new Promise((resolve, reject) => {
    _bcrypt.default.compare(password, hashPassword, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

const User = (0, _mongoose.model)('user', userSchema);
exports.User = User;