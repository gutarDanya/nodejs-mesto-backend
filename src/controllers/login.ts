import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SignupError from '../utils/SignupError';
import User from '../models/User/user';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  await User.findUserByCredentials(email, password)
    .select('+password')
    .then((user) => {
      const token = jwt.sign({ _id: user?._id }, 'some-secret-key', { expiresIn: 3600 });

      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
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

  await User.findOne({ email })
    .then((user) => {
      if (!user) {
        return bcrypt.hash(password, 10);
      }

      throw new SignupError('такой пользователь уже существует');
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch(next);
};
