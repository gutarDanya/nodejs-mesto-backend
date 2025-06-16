import { NextFunction, Request, Response } from 'express';
import { CrutchRequest } from '../utils/types';
import User from '../models/User/user';
import NotFoundError from '../utils/NotFoundError';

export const getUsers = async (req: Request, res: Response) => {
  await User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'ошибка' }));
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

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  await User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: 'ошибка' }));
};

export const updateUserAbout = async (req: CrutchRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;
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

export const updateUserAvatar = async (req: CrutchRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;
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
