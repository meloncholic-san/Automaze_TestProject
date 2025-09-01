import { registerUser, loginUser } from '../services/authService.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import * as fs from 'node:fs/promises';

export const registerUserCtrl = async (req, res) => {
  let avatar = null;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    avatar = result.url;
  }

  const { name, email, password } = req.body;
  const data = await registerUser({ name, email, password, avatarUrl: avatar });

  res.status(201).json({
    message: 'Successfully registered',
    data,
  });
};

export const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginUser(email, password);

  res.status(200).json({
    message: 'Successfully logged in',
    data,
  });
};
