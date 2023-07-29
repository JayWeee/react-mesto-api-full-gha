const router = require('express').Router();

const {
  validateCreateCard,
  validateCardId,
} = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCardById,
  putLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCardById);
router.put('/:cardId/likes', validateCardId, putLikeCard);
router.delete('/:cardId/likes', validateCardId, deleteLikeCard);

module.exports = router;
