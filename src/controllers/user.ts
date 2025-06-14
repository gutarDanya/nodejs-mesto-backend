import { Request, Response } from "express"
import User from '../models/User/user'

export const getUsers = async (req: Request, res: Response) => {
  await User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "ошибка" }))
}

export const getUser = async (req: Request, res: Response) => {

  const id = req.params.id
  await User.findById(id)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: "ошибка" }))
}

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body
  await User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: "ошибка" }))
}