import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../utils/types';
import Card from '../models/Card/Card';
import NotFoundError from '../utils/NotFoundError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  await Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const createCard = async (req: IRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const _id = req.user;
  await Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

export const deleteCard = async (req: IRequest, res: Response, next: NextFunction) => {
  await Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('этот пользователь не найден');
      } else if (card.owner._id !== req.user) {
        throw new Error('Вы не можете удалять карточки других пользователей');
      }

      res.status(200).send(card);
    })
    .catch(next);
};

export const likeCard = async (req: IRequest, res: Response, next: NextFunction) => {
  const _id = req.params.cardId;
  const id = req.user;

  await Card.findByIdAndUpdate(_id, { $addToSet: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('этот пользователь не найден');
      }

      res.status(200).send(card);
    })
    .catch(next);
};

export const removeLikeCard = async (req: IRequest, res: Response, next: NextFunction) => {
  const _id = req.params.cardId;
  const id = req.user;

  await Card.findByIdAndUpdate(_id, { $pull: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('этот пользователь не найден');
      }

      res.status(200).send(card);
    })
    .catch(next);
};
