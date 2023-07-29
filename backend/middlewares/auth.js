const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');

const SECRET_KEY = 'verry-secret-key';

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
