import { Router } from 'express';
import { getAllUsers, createNewUser, login } from '../controllers/user';
import { generateToken } from '../controllers/auth';

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

export default userRouter;

