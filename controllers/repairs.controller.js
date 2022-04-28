const { Repair } = require('../models/repair.model');

const getAllRepairs = async (req, res) => {
    try {
        const repairs = await Repair.findAll();
        res.status(200).json({ repairs });
    } catch (error) {
        console.log(error)
    }
};

const createRepair = async (req, res) => {
    try {
        const { date, userId } = (req.body)
        const newRepair = await Repair.create({ date, userId });
        res.status(201).json({ newRepair });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' })
    }
}

const getRepairById = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repair.findOne({ where: { id } })
        if (!repair) {
            return res.status(404).json({ status: 'Not found', message: 'Can not find the repair' })
        }
        if (repair.status === 'pending') {
            res.status(200).json({ repair })
        } else {
            return res.status(404).json({ status: 'Not found', message: 'This repair is not availible' })
        }
    } catch (error) {
        console.log(error);
    }
}

const updateRepair = async (req, res) => {
    try {
        const { id } = req.params;

        const repair = await Repair.findOne({ where: { id } });
        if (!repair) {
            return res.status(404).json({ status: 'Not found', message: 'Can not find the user' })
        }
        if (repair.status === 'pending') {
            await repair.update({ status: 'completed' });
            await repair.save();
            res.status(200).json({ status: 'success', message: 'Repair completed succesfully!' });
        } else {
            return res.status(404).json({ status: 'Not found', message: 'This repair is not availible' })
        }

    } catch (error) {
        console.log(error);
    }
}

const deleteRepair = async (req, res) => {
    try {
        const { id } = req.params;

        const repair = await Repair.findOne({ where: { id } });
        if (!repair) {
            return res.status(404).json({ status: 'Not found', message: 'Can not find the repair' })
        }
        if (repair.status === 'pending') {
            await repair.update({ status: 'cancelled' });
            await repair.save();
            res.status(200).json({ status: 'success', message: 'Repair cancelled succesfully!' });
        } else {
            return res.status(404).json({ status: 'Not found', message: 'This repair is not availible' })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllRepairs, createRepair, getRepairById, updateRepair, deleteRepair }