import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SignupError from '../utils/SignupError';
import User from '../models/User/user';
import { JWT_SECRET } from '../../config';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  await User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user?._id }, JWT_SECRET, { expiresIn: 3600 });

      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).end();
    })

    .catch(next);
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  await bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const { password: _, ...userToSend } = user.toObject();
      res.status(201).send(userToSend);
    })
    .catch((error) => {
      if (error.code === 11000 && error.name === 'MongoServerError') {
        next(new SignupError('такой пользователь уже существет'));
      } else {
        next(error);
      }
    });
};
