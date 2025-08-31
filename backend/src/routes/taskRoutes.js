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

const router = express.Router();
const jsonParser = express.json();

router.get("/", ctrlWrapper(getTasks));
router.post("/", jsonParser, validateBody(createTaskSchema), ctrlWrapper(postTask));
router.patch("/:id", jsonParser, isValidId, validateBody(updateTaskSchema), ctrlWrapper(patchTask));
router.delete("/:id", isValidId, ctrlWrapper(removeTask));

export default router;