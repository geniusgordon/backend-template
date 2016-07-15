import { Router } from 'express';
import { getAllUsers, createNewUser, login } from '../controllers/user';
import { generateToken, verifyToken } from '../controllers/auth';
import { loginRequired } from '../middlewares/auth';
import { validateString } from '../core/utils';

const userRouter = new Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    validateString('username', username, { required: true });
    validateString('password', password, { required: true });
    const user = await createNewUser(username.trim(), password.trim());
    const token = await generateToken(user);
    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    validateString('username', username, { required: true });
    validateString('password', password, { required: true });
    const user = await login(username.trim(), password.trim());
    const token = await generateToken(user);
    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.get('/me', loginRequired, async (req, res, next) => {
  try {
    const user = await verifyToken(req.token);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export default userRouter;

