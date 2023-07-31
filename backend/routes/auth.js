const router = require('express').Router();

const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { login, createUser, logout } = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.get('/signout', logout);

module.exports = router;
