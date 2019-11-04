"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrudControllers = void 0;

const getMany = model => async (req, res) => {
  try {
    const data = await model.find({}, {
      password: 0
    });
    res.json({
      data
    });
  } catch (e) {
    res.status(400).send({
      message: e
    });
  }
};

const createOne = model => async (req, res) => {
  const data = await model.create(req.body);
  res.json(data);
};

const getOne = model => async (req, res) => {
  const data = await model.findById(req.params.id);
  res.json(data);
};

const deleteOne = model => async (req, res) => {
  try {
    const id = req.params.id;
    const data = await model.findByIdAndRemove(id);
    res.json(data);
  } catch (e) {
    res.status(400).send({
      message: 'An error occured'
    });
  }
};

const CrudControllers = model => ({
  getMany: getMany(model),
  createOne: createOne(model),
  getOne: getOne(model),
  deleteOne: deleteOne(model)
});

exports.CrudControllers = CrudControllers;