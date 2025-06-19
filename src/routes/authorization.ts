import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import validator from 'validator';
import { createUser, login } from '../controllers/login';

const router = Router();

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().custom((value, helpers) => {
      if (!validator.isEmail(value)) {
        return helpers.error('email is invalid');
      }
      return value;
    }),
    password: Joi.string(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

export default router;
