const express = require('express');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, login } = require('../controllers/users.controller');
const { validUser, protectToken, validUserId, protectEmployee } = require('../middlewares/users.middlewares');
const { createUserValidations, errorValidations } = require('../middlewares/validations.middlewares')
const router = express.Router();


router.post('/', createUserValidations, errorValidations, createUser);
router.post('/login', login);

router.use(protectToken);
router.get('/', protectEmployee, getAllUsers);
router.route('/:id').get(protectEmployee, validUser, getUserById).patch(validUserId, validUser, updateUser).delete(validUserId, validUser, deleteUser);

module.exports = { usersRouter: router };