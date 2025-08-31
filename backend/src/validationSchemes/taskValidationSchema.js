import Joi from "joi";
import { CategoryEnum } from "../utils/categoryEnum.js";


export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).allow('') ,
  done: Joi.boolean(),
  priority: Joi.number().min(1).max(10).default(5), 
  category: Joi.string()    
    .valid(...Object.values(CategoryEnum))
    .allow(null, ''),
  dueDate: Joi.date()
    .allow(null)
    .empty('')
    .optional()
    .default(null)
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().max(500).allow('') ,
  done: Joi.boolean(),
  priority: Joi.number().min(1).max(10),
  category: Joi.string()
    .valid(...Object.values(CategoryEnum))
    .allow(null, ''),
  dueDate: Joi.date()
    .allow(null)
    .empty('')
    .optional()
    .default(null)
  });
