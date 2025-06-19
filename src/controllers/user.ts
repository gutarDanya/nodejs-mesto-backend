import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../utils/types';
import User from '../models/User/user';
import NotFoundError from '../utils/NotFoundError';
import UnauthorizedError from '../utils/UnauthorizedError';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  await User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Этот пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

export const getActiveUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const id = req.user;

  await User.findById(id)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Необходима авторизация');
      }

      res.send(user);
    })
    .catch(next);
};

export const updateUserAbout = async (req: IRequest, res: Response, next: NextFunction) => {
  const id = req.user;
  const { name, about } = req.body;

  await User.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('этот пользователь не найден');
      }

      res.status(200).send(user);
    })
    .catch(next);
};

export const updateUserAvatar = async (req: IRequest, res: Response, next: NextFunction) => {
  const id = req.user;
  const { avatar } = req.body;

  await User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('этот пользователь не найден');
      }

      res.status(200).send(user);
    })
    .catch(next);
};
