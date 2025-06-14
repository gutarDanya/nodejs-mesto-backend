import { Router } from "express";
import { Request, Response } from "express";
import { getUsers, getUser, createUser } from "../controllers/user";

const router = Router()

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser)

export default router