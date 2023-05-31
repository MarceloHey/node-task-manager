const TaskModel = require('../models/Task')
const { asyncWrapper } = require('../middlewares/async')
const { createCustomError } = require('../helpers/CustomError')

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await TaskModel.find({})
  res.status(200).json({ tasks: tasks })
})

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await TaskModel.create(req.body)
  res.status(201).json({ task: task })
})

const getTaskById = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await TaskModel.findOne({ _id: taskID })

  if (!task) {
    return next(createCustomError(`Task with id ${taskID} was not found`, 404))
  }

  res.status(200).json({ task: task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await TaskModel.findOneAndDelete({ _id: taskID })

  if (!task) {
    return next(createCustomError(`Task with id ${taskID} was not found`, 404))
  }

  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await TaskModel.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })

  if (!task) {
    return next(createCustomError(`Task with id ${taskID} was not found`, 404))
  }

  res.status(200).json({ task: task, data: req.body })

})


module.exports = { getAllTasks, createTask, deleteTask, getTaskById, updateTask }