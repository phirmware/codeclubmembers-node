"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = require("mongoose");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

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
  password: String,
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
  },
  liked_posts: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]
});
userSchema.plugin(_passportLocalMongoose.default);
const User = (0, _mongoose.model)('user', userSchema);
exports.User = User;