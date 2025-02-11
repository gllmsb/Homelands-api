import express from 'express'
import { energy_labelsModel } from '../models/energy_labelsModel.js'

export const energy_labelsController = express.Router()


//*GET ALL energy_labels
energy_labelsController.get('/energy_labels', async (req, res) => {
    try {
        const energy_labels = await energy_labelsModel.findAll();

        if (!energy_labels || energy_labels.length === 0) {
            res.json({ message: 'No data found '});
        }
        res.json(energy_labels)
    } catch (error) {
        console.error(`Could not get energy_labels: ${error}`)
    }
});

//* GET DETAILS
energy_labelsController.get('/energy_labels/:id', async (req, res) => {
    const {id} = req.params

    try {
        const energy_labels = await energy_labelsModel.findOne({
            where: {id}
        });
        if (!energy_labels) {
            return res.status(404).json({ message: 'Could not find data'})
        }
        
        res.status(200).json(energy_labels);
    }catch (error) {
        console.error(`Could not fetch energy_labels: ${error}`)
        res.status(500).json({ error: error.message })
    }
});

//*CREATE
energy_labelsController.post('/energy_labels', async (req, res) => {
    const { name } = req.body;

    if (!name ) {
        return res.status(400).json({ message: 'Missing data required'});
    }

    try {
        const energy_labels = await energy_labelsModel.create({
            name
        })

        res.status(201).json({ message: 'energy_labels created successfully', energy_labels})
    } catch (error) {
        res.status(500).json({ message: `Could not create energy_labels ${error}`})
    }
})

//*UPDATE
energy_labelsController.put('/energy_labels', async (req, res) => {
    const { id, name } = req.body;

    if (!id || !name ) {
        return res.status(400).json({ message: 'Missing required data'})
    }
    try {
        const result = await energy_labelsModel.update({
            name
        }, {
            where: {id}
        })
        if (result === 0) {
            return res.status(404).json({ message: 'energy_labels not found or no changes made'})
        }
            return res.status(200).json({ message: 'energy_labels updated successfully'})
    } catch (error) {
        return res.json({ message: `Could not update energy_labels ${error}`})
    }
})

//*DELETE
energy_labelsController.delete('/energy_labels/:id', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await energy_labelsModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message: `Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete energy_labels: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})