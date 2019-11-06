"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _post = require("./post.model");

var _user = require("../user/user.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createNewPost = async (req, res) => {
  const {
    id
  } = req.user;

  const body = _objectSpread({}, req.body);

  body.user_id = id;
  body.user_details = id;

  try {
    const post = await _post.Post.create(body);

    if (post) {
      req.user.number_of_posts++;
      req.user.save();
    }

    res.json(post);
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong'
    });
  }
};

const findAllPosts = async (req, res) => {
  try {
    const posts = await _post.Post.find().populate('user_details users_that_liked').exec();
    res.json(posts);
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

const likePost = async (req, res) => {
  const {
    id
  } = req.user;
  const {
    postId
  } = req.params;

  try {
    const {
      liked_posts
    } = req.user;
    let alreadyLiked;
    liked_posts.forEach(item => {
      if (item == postId) {
        alreadyLiked = true;
      }
    });

    if (alreadyLiked) {
      return res.status(401).json({
        message: 'User already liked this post'
      });
    }

    const post = await _post.Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    const posterId = post.user_id;
    const poster = await _user.User.findById(posterId);
    poster.number_of_likes++;

    if (poster.number_of_likes > 10) {
      poster.power_level = 'chunin';
      poster.power_level_rating = 20;
    }

    if (poster.number_of_likes > 50) {
      poster.power_level = 'jounin';
      poster.power_level_rating = 40;
    }

    if (poster.number_of_likes > 150) {
      poster.power_level = 'anbu';
      poster.power_level_rating = 60;
    }

    if (poster.number_of_likes > 500) {
      poster.power_level = 'sanin';
      poster.power_level_rating = 80;
    }

    if (poster.number_of_likes > 1000) {
      poster.power_level = 'kage';
      poster.power_level_rating = 100;
    }

    poster.save();
    post.number_of_likes++;
    post.users_that_liked.push(id);
    post.save();
    req.user.liked_posts.push(postId);
    req.user.save();
    res.json({
      message: 'liked'
    });
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong'
    });
  }
};

const fetchPost = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const post = await _post.Post.findById(id).populate('user_details users_that_liked').exec();
    post.number_of_views++;
    post.save();
    res.json(post);
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong'
    });
  }
};

var _default = _objectSpread({}, (0, _crud.CrudControllers)(_post.Post), {
  createNewPost,
  findAllPosts,
  likePost,
  fetchPost
});

exports.default = _default;