"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.login = exports.signUp = exports.resolveToken = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = require("../resources/user/user.model");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createToken = user => {
  return _jsonwebtoken.default.sign(user, 'KD`q.#$5ioem323#1!39', {
    expiresIn: '1hr'
  });
};

exports.createToken = createToken;

const resolveToken = token => {
  return new Promise((resolve, reject) => {
    _jsonwebtoken.default.verify(token, 'KD`q.#$5ioem323#1!39', (err, payload) => {
      if (err) {
        return reject(err);
      }

      resolve(payload);
    });
  });
};

exports.resolveToken = resolveToken;

const signUp = (req, res) => {
  const {
    username,
    password,
    role,
    status,
    display_image
  } = req.body;

  try {
    _user.User.register(new _user.User({
      username,
      role,
      status,
      display_image
    }), password, err => {
      if (err) {
        return res.status(400).json({
          err,
          message: 'This one'
        });
      }

      _user.User.findOne({
        username
      }).then(user => {
        console.log(user);
        const token = createToken({
          username,
          id: user._id
        });
        res.json({
          token
        });
      }).catch(e => {
        console.log(e);
      });
    });
  } catch (e) {
    res.status(400).send(e);
  }
}; // export const login = async (req, res) => {
//     try {
//         const { password, username } = req.body;
//         const user = await User.findOne({ username }).select('username password').exec();
//         if (!user) {
//             res.status(404).send({ message: 'User not found' });
//         } else {
//             const same = await user.checkPassword(password);
//             if (!same) {
//                 res.status(400).send({ message: 'Invalid password' });
//             } else {
//                 const token = createToken({ username, id: user.id });
//                 res.json({ token });
//             }
//         }
//     } catch (e) {
//         return res.status(404).json({ message: 'Error' });
//     }
// }


exports.signUp = signUp;

const login = (req, res, next) => {
  const {
    username
  } = req.body;

  _passport.default.authenticate('local', {
    session: false
  }, (err, user) => {
    console.log(user, 'Eyo');

    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right'
      });
    }

    req.login(user, {
      session: false
    }, err => {
      if (err) {
        return res.send(err);
      }

      console.log(user);
      const token = createToken({
        username,
        id: user._id
      });
      res.json({
        token
      });
    });
  })(req, res, next);
};

exports.login = login;

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next('No token provided');
  }

  const arr = authHeader.split(' ');
  const token = arr[0] === 'Bearer' ? arr[1] : false;

  try {
    const data = await resolveToken(token);
    const user = await _user.User.findById(data.id, {
      password: 0
    });

    if (user) {
      req.user = user;
      next();
    } else {
      next('No user found');
    }
  } catch (e) {
    next('Invalid Token');
  }
};

exports.protect = protect;