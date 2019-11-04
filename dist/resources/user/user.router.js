"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./user.controller"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.route('/').get(_user.default.getMany).post(_user.default.createOne);
router.route('/profile').get(_user.default.getFullProfile).post(_user.default.editProfile);
var _default = router;
exports.default = _default;