import { Router } from 'express';
import { getAllUsers, createNewUser, login } from '../controllers/user';
import { generateToken, verifyToken } from '../controllers/auth';
import { loginRequired } from '../middlewares/auth';
import { validateString } from '../core/utils';
import wrap from '../core/wrap';

const userRouter = new Router();

userRouter.get('/', wrap(async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json({
    users,
  });
}));

userRouter.post('/signup', wrap(async (req, res) => {
  const { username, password } = req.body;
  validateString('username', username, { required: true });
  validateString('password', password, { required: true });
  const user = await createNewUser(username.trim(), password.trim());
  const token = await generateToken(user);
  res.status(200).json({
    success: true,
    token,
  });
}));

userRouter.post('/login', wrap(async (req, res) => {
  const { username, password } = req.body;
  validateString('username', username, { required: true });
  validateString('password', password, { required: true });
  const user = await login(username.trim(), password.trim());
  const token = await generateToken(user);
  res.status(200).json({
    success: true,
    token,
  });
}));

userRouter.get('/me', loginRequired, wrap(async (req, res) => {
  const user = await verifyToken(req.token);
  res.status(200).json(user);
}));

export default userRouter;

