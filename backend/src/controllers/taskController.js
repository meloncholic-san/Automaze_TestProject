import { listTasks, createTask, updateTask, deleteTask } from '../services/taskService.js';

export const getTasks = async (req, res) => {
  const { search, status, sort, category } = req.query;
  const userId = req.user.sub;

  const tasks = await listTasks({ search, status, sort, category, owner: userId });

  res.status(200).json({ status: 200, data: tasks });
};

export const postTask = async (req, res) => {
  const taskData = {
    ...req.body,
    owner: req.user.sub,
  };

  const task = await createTask(taskData);
  res.status(201).json({ status: 201, data: task });
};

export const patchTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.sub;

  const task = await updateTask(id, req.body, userId);
  if (!task) return res.status(404).json({ message: "Task not found or access denied" });
  res.json({ status: 201, data: task });
};

export const removeTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.sub;

  const task = await deleteTask(id, userId);
  if (!task) return res.status(404).json({ message: "Task not found or access denied" });
  res.status(204).send();
};