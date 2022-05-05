const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');


const getAllRepairs = async (req, res) => {
    try {
        const repairs = await Repair.findAll({
            include: [{ model: User }]
        });
        res.status(200).json({ repairs });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
};

const createRepair = async (req, res) => {
    try {
        const { date, computerNumber, comments, userId } = (req.body)
        const newRepair = await Repair.create({ date, computerNumber, comments, userId });
        res.status(201).json({ newRepair });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
}

const getRepairById = async (req, res) => {
    try {
        const { repair } = req;

        res.status(200).json({ repair })
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
}

const updateRepair = async (req, res) => {
    try {
        const { repair } = req;
        await repair.update({ status: 'completed' });
        await repair.save();
        res.status(200).json({ status: 'success', message: 'Repair completed succesfully!' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
}

const deleteRepair = async (req, res) => {
    try {
        const { repair } = req
        await repair.update({ status: 'cancelled' });
        await repair.save();
        res.status(200).json({ status: 'success', message: 'Repair cancelled succesfully!' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
}

module.exports = { getAllRepairs, createRepair, getRepairById, updateRepair, deleteRepair }