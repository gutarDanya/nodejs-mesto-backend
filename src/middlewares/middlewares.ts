//Временное решение для аавторизации
import { NextFunction, Request, Response } from "express"
import { CrutchRequest } from "utils/types"

export const authorizahion = (req: CrutchRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "684ddea4b97d076d9e29072c"
  }

  next()
}