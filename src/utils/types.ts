import { Request } from 'express';

// Временное решение для идентификации пользователя
export interface CrutchRequest extends Request {
  user?: {
    _id: string
  }
}

export interface ErrorWithStatus extends Error {
  statusCode: number
}
