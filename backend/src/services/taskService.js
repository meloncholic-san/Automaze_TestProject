import createHttpError from "http-errors";

import Task from "../db/models/Tasks.js";

export const listTasks = async ({ search, status, sort, category }) => {
  const filter = {};
  if (search) filter.$or = [
    { title: new RegExp(search, "i") },
    { description: new RegExp(search, "i") },
  ];
  if (status === "done") filter.done = true;
  else if (status === "undone") filter.done = false;
  if (category) filter.category = category;

  let query = Task.find(filter);
  if (sort === "priority_asc") query = query.sort({ priority: 1 });
  else if (sort === "priority_desc") query = query.sort({ priority: -1 });
  else query = query.sort({ createdAt: -1 });


  let result = query.exec();
  return result;
};

export const createTask = async (data) => {
  const task = new Task(data);
  try {
    return await task.save();
  } catch (err) {
    throw createHttpError(400, 'Failed to create task', { cause: err });
  }
};

export const updateTask = async (id, data) => {
  const task = await Task.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!task) {
    throw createHttpError(404, "Task not found");
  }
  return task;
};

export const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw createHttpError(404, "Task not found");
  }
  return task;
};