const express = require('express');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/users.controller');
const { validUser } = require('../middlewares/users.middlewares');
const { createUserValidations, errorValidations } = require('../middlewares/validations.middlewares')
const router = express.Router();


router.get('/', getAllUsers);
router.post('/', createUserValidations, errorValidations, createUser);


router.route('/:id').get(validUser, getUserById).patch(validUser, updateUser).delete(validUser, deleteUser);

module.exports = { usersRouter: router };

