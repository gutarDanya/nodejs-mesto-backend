import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IRequest } from '../utils/types';
import UnauthorizedError from '../utils/UnauthorizedError';

const { JWT_SECRET = '123456789' } = process.env;
const auth = async (req: IRequest, res: Response, next: NextFunction) => {
  if (!req.cookies.token || !req.cookies.token.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = req.cookies.token.replace('Bearer ', '');
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
