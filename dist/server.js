"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _user = _interopRequireDefault(require("./resources/user/user.router"));

var _project = _interopRequireDefault(require("./resources/project/project.router"));

var _post = _interopRequireDefault(require("./resources/post/post.router"));

var _db = require("./utils/db");

var _auth = require("./utils/auth");

var _user2 = _interopRequireDefault(require("./resources/user/user.controller"));

var _project2 = _interopRequireDefault(require("./resources/project/project.controller"));

var _post2 = _interopRequireDefault(require("./resources/post/post.controller"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _user3 = require("./resources/user/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 3000;
app.disable('x-powered-by');
app.use(_passport.default.initialize());
app.use(_passport.default.session());
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev'));

_passport.default.use(new _passportLocal.Strategy(_user3.User.authenticate()));

_passport.default.serializeUser(_user3.User.serializeUser());

_passport.default.deserializeUser(_user3.User.deserializeUser());

app.post('/login', _auth.login);
app.post('/signup', _auth.signUp);
app.get('/members', _user2.default.getMany);
app.post('/star/:id', _user2.default.addAStar);
app.get('/members/:username', _user2.default.viewFullProfile);
app.get('/projects/:id', _project2.default.viewProjects);
app.get('/posts', _post2.default.findAllPosts);
app.get('/post/:id', _post2.default.fetchPost);
app.use('/api', _auth.protect);
app.use('/api/user', _user.default);
app.use('/api/project', _project.default);
app.use('/api/post', _post.default);
app.get('/', (req, res) => {
  res.json({
    message: 'Im here'
  });
});
app.post('/', (req, res) => {
  console.log(req.body);
  res.json({
    message: "Yo"
  });
});

const start = async () => {
  try {
    await (0, _db.connect)();
  } catch (e) {
    console.log(`Could not connect to server 😠 😠 😠 😠 😠 😠 😠 `);
  }

  app.listen(port, () => {
    console.log(`Connected 😎 😎 😎 😎 at port 3000`);
  });
};

exports.start = start;