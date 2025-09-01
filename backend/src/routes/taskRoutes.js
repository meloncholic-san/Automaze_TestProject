import express from "express";
import {
  getTasks,
  postTask,
  patchTask,
  removeTask,
} from "../controllers/taskController.js";
import validateBody from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createTaskSchema, updateTaskSchema } from "../validationSchemes/taskValidationSchema.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js"
import { authMiddleware } from '../middlewares/auth.js';


const router = express.Router();
const jsonParser = express.json();

router.get("/", authMiddleware, ctrlWrapper(getTasks));
router.post("/", authMiddleware, jsonParser, validateBody(createTaskSchema), ctrlWrapper(postTask));
router.patch("/:id", authMiddleware, jsonParser, isValidId, validateBody(updateTaskSchema), ctrlWrapper(patchTask));
router.delete("/:id",authMiddleware, isValidId, ctrlWrapper(removeTask));

export default router;