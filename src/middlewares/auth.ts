import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IRequest, ErrorWithStatus } from '../utils/types';
import UnauthorizedError from '../utils/UnauthorizedError';

export const errorsMW = (
  err: ErrorWithStatus,
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: message || 'На сервере произошла ошибка',
  });

  next();
};

export const auth = async (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization?.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token!, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
