import express from 'express';
import multer from 'multer';
import {
  registerUserCtrl,
  loginUserCtrl,
  logoutUserCtrl
} from '../controllers/authController.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js"
import validateBody from '../middlewares/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validationSchemes/authValidationSchema.js';
import { upload } from '../middlewares/upload.js';


const router = express.Router();
const jsonParser = express.json();

router.post('/register', upload.single('avatar'), validateBody(registerUserSchema), ctrlWrapper(registerUserCtrl));
router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserCtrl));
router.post('/logout', ctrlWrapper(logoutUserCtrl));


export default router;