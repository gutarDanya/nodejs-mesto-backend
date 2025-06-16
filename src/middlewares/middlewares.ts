// Временное решение для аавторизации
import { NextFunction, Response } from 'express';
import { CrutchRequest } from '../utils/types';

export default (req: CrutchRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '684ddea4b97d076d9e29072c',
  };

  next();
};
