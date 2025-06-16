import { Router } from 'express';
import {
  getUsers, getUser, createUser, updateUserAbout, updateUserAvatar,
} from '../controllers/user';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.patch('/me', updateUserAbout);

router.patch('/me/avatar', updateUserAvatar);

export default router;
