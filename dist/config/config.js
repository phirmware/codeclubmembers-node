"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var environment = {};
environment.development = {
  port: 3000,
  envName: 'Development',
  db: 'mongodb://localhost/codeclubmembers'
};
environment.production = {
  port: process.env.PORT,
  envName: 'Production',
  db: 'mongodb://phirmware:itachi1@ds241268.mlab.com:41268/codeclub'
};
const env = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'development';
const environmentToExport = typeof environment[env] === 'object' ? environment[env] : environment.development;
var _default = environmentToExport;
exports.default = _default;