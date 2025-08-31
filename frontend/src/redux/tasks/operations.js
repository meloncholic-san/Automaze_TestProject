import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../index.js";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async ({ search = "", status = "all", sort = "priority_asc", category = "" } = {}, thunkAPI) => {
    try {
      const response = await api.get("/api/tasks", {
        params: { search, status, sort, category },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, thunkAPI) => {
    try {
    const preparedTaskData = {
      ...taskData,
      category: taskData.category === "" ? null : taskData.category,
      dueDate: taskData.dueDate === "" ? null : taskData.dueDate,
    };
      const response = await api.post("/api/tasks", preparedTaskData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, update }, thunkAPI) => {
    try {
      const response = await api.patch(`/api/tasks/${id}`, update);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
