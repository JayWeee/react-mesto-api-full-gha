const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { ValidationError, CastError } = require('mongoose').Error;

const Card = require('../models/card');

const NotFoundErr = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const ForbiddenErr = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestErr('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundErr('Карточка с указанным _id не найдена.');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenErr('Вы не можете удалять чужие карточки.'));
      } else {
        Card.deleteOne(card)
          .then(res.status(HTTP_STATUS_OK).send({ message: 'Пост удален.' }));
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestErr('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

const handleLikeCard = (req, res, likeData, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    likeData,
    {
      new: true,
    },
  )
    .orFail(() => {
      throw new NotFoundErr('Передан несуществующий _id карточки.');
    })
    .then((card) => res.status(HTTP_STATUS_OK).send(card))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestErr('Передан несуществующий _id карточки.'));
      } else {
        next(err);
      }
    });
};

const putLikeCard = (req, res, next) => {
  const putLike = { $addToSet: { likes: req.user._id } };
  return handleLikeCard(req, res, putLike, next);
};

const deleteLikeCard = (req, res, next) => {
  const removeLike = { $pull: { likes: req.user._id } };
  return handleLikeCard(req, res, removeLike, next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  putLikeCard,
  deleteLikeCard,
};
