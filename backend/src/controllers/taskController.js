import { listTasks, createTask, updateTask, deleteTask } from '../services/taskService.js';

export const getTasks = async (req, res) => {
  const { search, status, sort, category } = req.query;
  const tasks = await listTasks({ search, status, sort, category });
  res.status(200).json({ status: 200, data: tasks });
};

export const postTask = async (req, res) => {
  const task = await createTask(req.body);
  res.status(201).json({ status: 201, data: task });
};

export const patchTask = async (req, res) => {
  const { id } = req.params;
  const task = await updateTask(id, req.body);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ status: 201, data: task });
};

export const removeTask = async (req, res) => {
  const { id } = req.params;
  const task = await deleteTask(id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(204).send();
};
