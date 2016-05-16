import { Router } from 'express';
import { getAllUsers, createNewUser, login } from '../controllers/user';
import { generateToken, verifyToken } from '../controllers/auth';
import { loginRequired } from '../middlewares/auth';
import { validateString } from '../core/utils';

const userRouter = new Router();

userRouter.get('/', (req, res, next) => {
  getAllUsers().then((users) => {
    res.status(200).json({
      users,
    });
  }).catch((err) => {
    next(err);
  });
});

userRouter.post('/create', (req, res, next) => {
  const { username, password } = req.body;
  validateString('username', username, { required: true });
  validateString('password', password, { required: true });
  createNewUser(username.trim(), password.trim())
  .then((user) => generateToken(user))
  .then((token) => {
    res.status(200).json({
      success: true,
      token,
    });
  })
  .catch((err) => {
    next(err);
  });
});

userRouter.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  validateString('username', username, { required: true });
  validateString('password', password, { required: true });
  login(username.trim(), password.trim())
  .then((user) => generateToken(user))
  .then((token) => {
    res.status(200).json({
      success: true,
      token,
    });
  })
  .catch((err) => {
    next(err);
  });
});

userRouter.get('/me', loginRequired, (req, res, next) => {
  verifyToken(req.token)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    next(err);
  });
});

export default userRouter;

