"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _project = require("./project.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createProject = async (req, res) => {
  const {
    id
  } = req.user;

  const data = _objectSpread({}, req.body, {
    user_id: id
  });

  try {
    const project = await _project.Project.create(data);
    res.json(project);
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong'
    });
  }
};

const getUsersProjects = async (req, res) => {
  const {
    id
  } = req.user;

  try {
    const projects = await _project.Project.find({
      user_id: id
    });
    res.json(projects);
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong'
    });
  }
};

const viewProjects = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const projects = await _project.Project.find({
      user_id: id
    });
    res.json(projects);
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong'
    });
  }
};

var _default = _objectSpread({}, (0, _crud.CrudControllers)(_project.Project), {
  createProject,
  getUsersProjects,
  viewProjects
});

exports.default = _default;