const express = require('express');
const { getAllRepairs, getRepairById, createRepair, updateRepair, deleteRepair } = require('../controllers/repairs.controller');
const { validRepair } = require('../middlewares/repairs.middlewares');
const { createRepairValidations, errorValidations } = require('../middlewares/validations.middlewares')
const { protectEmployee, protectToken } = require('../middlewares/users.middlewares');
const { route } = require('express/lib/router');

const router = express.Router();

router.use(protectToken);

router.route('/').get(protectEmployee, getAllRepairs).post(createRepairValidations, errorValidations, createRepair);

router.use(protectEmployee);
router.route('/:id').get(validRepair, getRepairById).patch(validRepair, updateRepair).delete(validRepair, deleteRepair);


module.exports = { repairsRouter: router };