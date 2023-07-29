const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ValidationError, CastError } = require('mongoose').Error;

const User = require('../models/user');

const NotFoundErr = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');
const UnauthorizedErr = require('../errors/unauthorized-err');

const SECRET_KEY = 'verry-secret-key';

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundErr('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestErr('Пользователь по указанному _id не найден.'));
      } else next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS_OK).send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  hash(password, 10)
    .then((hashPassword) => User.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    }))
    .then((user) => res.status(HTTP_STATUS_CREATED).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestErr('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictErr('Пользователь с таким email уже существует.'));
      } else next(err);
    });
};

const updateUser = (req, res, userData, next) => {
  User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  }).then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestErr('Переданы некорректные данные при обновлении профиля.'));
      } else next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  return updateUser(req, res, { name, about }, next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return updateUser(req, res, { avatar }, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedErr('Неправильная почта или пароль.');
    })
    .then((user) => compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedErr('Неправильная почта или пароль.');
        }

        const token = jwt.sign(
          { _id: user._id },
          SECRET_KEY,
          { expiresIn: '7d' },
        );
        res.cookie('token', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
          .status(HTTP_STATUS_OK).send({ userId: user._id });
      }))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
