const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key';

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedErr('Необходима авторизация.');
  }

  let peyload;
  try {
    peyload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedErr('Необходима авторизация.'));
  }

  req.user = peyload;

  next();
};
