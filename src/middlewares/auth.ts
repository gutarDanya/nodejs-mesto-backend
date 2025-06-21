import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IRequest } from '../utils/types';
import UnauthorizedError from '../utils/UnauthorizedError';
import { JWT_SECRET } from '../../config';

const auth = async (req: IRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token!, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

export default auth;
