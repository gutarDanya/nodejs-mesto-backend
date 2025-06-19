import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// Временное решение для идентификации пользователя
export interface IRequest extends Request {
  user?: string | JwtPayload;
}

export interface ErrorWithStatus extends Error {
  statusCode: number
}
