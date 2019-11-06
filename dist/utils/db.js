"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.set('useNewUrlParser', true);

_mongoose.default.set('useFindAndModify', false);

_mongoose.default.set('useCreateIndex', true); //mongodb://<dbuser>:<dbpassword>@ds241268.mlab.com:41268/codeclub
//mongodb://localhost/codeclubmembers


const connect = () => _mongoose.default.connect(_config.default.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports.connect = connect;

_mongoose.default.connection.on('error', e => {
  console.log('Something went wrong', e);
});