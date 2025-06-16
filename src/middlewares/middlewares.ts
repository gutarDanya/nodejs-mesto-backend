// Временное решение для аавторизации
import { NextFunction, Response } from 'express';
import { CrutchRequest, ErrorWithStatus } from '../utils/types';

export const authorization = (req: CrutchRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '684ddea4b97d076d9e29072c',
  };

  next();
};

export const errorsMW = (
  err: ErrorWithStatus,
  req: CrutchRequest,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: message || 'ошибка сервера',
  });

  next();
};
