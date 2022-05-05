const express = require('express');
const { getAllRepairs, getRepairById, createRepair, updateRepair, deleteRepair } = require('../controllers/repairs.controller');
const { validRepair } = require('../middlewares/repairs.middlewares');
const { createRepairValidations, errorValidations } = require('../middlewares/validations.middlewares')


const router = express.Router();

router.route('/').get(getAllRepairs).post(createRepairValidations, errorValidations, createRepair);

router.route('/:id').get(validRepair, getRepairById).patch(validRepair, updateRepair).delete(validRepair, deleteRepair);


module.exports = { repairsRouter: router };