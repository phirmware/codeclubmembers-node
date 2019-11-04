"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _user = require("./user.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getFullProfile = (req, res) => {
  res.json(req.user);
};

const viewFullProfile = async (req, res) => {
  const {
    username
  } = req.params;

  try {
    const user = await _user.User.findOne({
      username
    }, {
      password: 0
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({
      message: 'An error occured'
    });
  }
};

const editProfile = async (req, res) => {
  const {
    id
  } = req.user;

  try {
    const update = await _user.User.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.json(update);
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong',
      e
    });
  }
};

const addAStar = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const user = await _user.User.findById(id);
    user.number_of_stars++;

    if (user.number_of_stars > 20) {
      user.ranking_rating = 25;
      user.ranking = 'bubble';
    }

    if (user.number_of_stars > 40) {
      user.ranking_rating = 50;
      user.ranking = 'waves';
    }

    if (user.number_of_stars > 70) {
      user.ranking_rating = 75;
      user.ranking = 'cyclone';
    }

    if (user.number_of_stars > 120) {
      user.ranking_rating = 100;
      user.ranking = 'typhoon';
    }

    if (user.number_of_stars > 200) {
      user.ranking_rating = 100;
      user.ranking = 'super cyclone';
    }

    user.save();
    res.json({
      message: 'done'
    });
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong'
    });
  }
};

var _default = _objectSpread({}, (0, _crud.CrudControllers)(_user.User), {
  getFullProfile,
  addAStar,
  viewFullProfile,
  editProfile
});

exports.default = _default;