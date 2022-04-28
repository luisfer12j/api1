const express = require('express');
const { getAllRepairs, getRepairById, createRepair, updateRepair, deleteRepair } = require('../controllers/repairs.controller');

const router = express.Router();

router.route('/').get(getAllRepairs).post(createRepair);

router.route('/:id').get(getRepairById).patch(updateRepair).delete(deleteRepair);


module.exports = { repairsRouter: router };