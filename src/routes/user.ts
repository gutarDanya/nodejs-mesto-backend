import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUser, createUser, updateUserAbout, updateUserAvatar,
} from '../controllers/user';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
  }),
}), createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
}), updateUserAbout);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateUserAvatar);

export default router;
