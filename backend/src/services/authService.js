import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new createHttpError.Conflict('Email is already in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = await User.create({
    ...payload,
    password: hashedPassword,
  });

  const accessToken = jwt.sign(
    { sub: newUser._id, email: newUser.email },
    getEnvVar('JWT_SECRET'),
    { expiresIn: '15m' }
  );

  return {
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatarUrl: newUser.avatarUrl,
    },
    accessToken,
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
      console.log(user);
  if (!user) {

    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(user.password)
  console.log(hashedPassword)
  if (!isMatch) {
    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }

  const accessToken = jwt.sign(
    { sub: user._id, email: user.email },
    getEnvVar('JWT_SECRET'),
    { expiresIn: '15m' }
  );

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    },
    accessToken,
  };
};
