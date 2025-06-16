import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getCards, createCard, deleteCard, likeCard, removeLikeCard,
} from '../controllers/card';

const router = Router();

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    // owner: Joi.string().required(),
  }),
}), createCard);

router.delete('/:cardId', deleteCard);

/* id захардокоженый, проверка может не проходить по умолчанию */
router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string(),
  }),
}), removeLikeCard);

export default router;
