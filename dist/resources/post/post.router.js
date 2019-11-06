"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _post = _interopRequireDefault(require("./post.controller"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.route('/').get(_post.default.findAllPosts).post(_post.default.createNewPost);
router.route('/like/:postId').post(_post.default.likePost);
router.route('/:id').get(_post.default.fetchPost);
var _default = router;
exports.default = _default;