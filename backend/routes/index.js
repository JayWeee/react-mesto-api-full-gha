const router = require('express').Router();
const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');
const NotFoundErr = require('../errors/not-found-err');

router.use('/', authRouter);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use('/', auth, () => {
  throw new NotFoundErr('Такого пути не существует.');
});

module.exports = {
  router,
};
