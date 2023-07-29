const router = require('express').Router();

const {
  validateGetUserById,
  validateUpdateUser,
} = require('../middlewares/validation');
const {
  getUsers,
  getUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', validateGetUserById, getUserById);
router.patch('/me', validateUpdateUser, updateUserProfile);
router.patch('/me/avatar', validateUpdateUser, updateUserAvatar);

module.exports = router;
