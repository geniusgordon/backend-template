import { Router } from 'express';
import userRouter from './users';

const router = new Router();

router.get('/', (req, res) => {
  res.json({
    message: 'this is a backend template',
  });
});

router.use('/users', userRouter);

export default router;

