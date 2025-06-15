import { Request, Response } from "express";
import Card from "../models/Card/Card";
import { CrutchRequest } from "utils/types";

export const getCards = async (req: Request, res: Response) => {

  await Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: err }))
}

export const createCard = async (req: CrutchRequest, res: Response) => {
  const {name, link} = req.body;
  const _id = req.user?._id
  await Card.create({name, link, owner: _id})
  .then((card) => res.status(201).send(card))
  .catch((err) => res.status(500).send({ message: err }))
}

export const deleteCard = async (req: Request, res: Response) => {

  await Card.findByIdAndDelete(req.params.cardId)
  .then((card) => res.status(200).send(card))
  .catch(() => res.status(500).send({ message: "ошибка" }))
}