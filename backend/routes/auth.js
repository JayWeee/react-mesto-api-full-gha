const router = require('express').Router();

const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

module.exports = router;
