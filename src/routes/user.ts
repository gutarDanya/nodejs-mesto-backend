import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUser, updateUserAbout, updateUserAvatar, getActiveUser,
} from '../controllers/user';

const router = Router();

router.get('/', getUsers);

router.get('/me', getActiveUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
}), updateUserAbout);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)([-._~:/?#[\]@!$&'()*+,;=]*[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*(#)?$/).required(),
  }),
}), updateUserAvatar);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);

export default router;
