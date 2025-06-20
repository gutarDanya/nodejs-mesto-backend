import { Response, NextFunction } from 'express';
import { ErrorWithStatus, IRequest } from '../utils/types';

const errorsMW = (
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

export default errorsMW;
