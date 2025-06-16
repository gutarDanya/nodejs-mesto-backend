import { NextFunction, Request, Response } from 'express';
import { CrutchRequest } from '../utils/types';
import Card from '../models/Card/Card';
import NotFoundError from '../utils/NotFoundError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  await Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const createCard = async (req: CrutchRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const _id = req.user?._id;
  await Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  await Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('этот пользователь не найден');
      }

      res.status(200).send(card);
    })
    .catch(next);
};

export const likeCard = async (req: CrutchRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;

  await Card.findByIdAndUpdate(id, { $addToSet: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('этот пользователь не найден');
      }

      res.status(200).send(card);
    })
    .catch(next);
};

export const removeLikeCard = async (req: CrutchRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;

  await Card.findByIdAndUpdate(id, { $pull: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('этот пользователь не найден');
      }

      res.status(200).send(card);
    })
    .catch(next);
};
