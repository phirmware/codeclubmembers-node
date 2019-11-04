"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _project = _interopRequireDefault(require("./project.controller"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.route('/').get(_project.default.getUsersProjects).post(_project.default.createProject);
var _default = router;
exports.default = _default;