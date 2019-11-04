"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = void 0;

var _mongoose = require("mongoose");

const ProjectSchema = new _mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  summary: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  },
  project_url: {
    type: String,
    required: true,
    trim: true
  }
});
const Project = (0, _mongoose.model)('project', ProjectSchema);
exports.Project = Project;