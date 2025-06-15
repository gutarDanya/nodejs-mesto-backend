import { Request, Response } from "express"
import User from '../models/User/user'
import { CrutchRequest } from "utils/types"

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

export const updateUserAbout = async (req: CrutchRequest, res: Response) => {
  const id = req.user?._id
  const { name, about } = req.body

  await User.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: "ошибка" }))
}

export const updateUserAvatar = async (req: CrutchRequest, res: Response) => {
  const id = req.user?._id
  const { avatar } = req.body

  await User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: "ошибка" }))
}