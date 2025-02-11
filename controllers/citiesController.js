import express from 'express'
import { citiesModel } from '../models/citiesModel.js'

export const citiesController = express.Router()


//*GET ALL CITIES
citiesController.get('/cities', async (req, res) => {
    try {
        const cities = await citiesModel.findAll();

        if (!cities || cities.length === 0) {
            res.json({ message: 'No data found '});
        }
        res.json(cities)
    } catch (error) {
        console.error(`Could not get cities: ${error}`)
    }
});

//* GET DETAILS
citiesController.get('/cities/:id', async (req, res) => {
    const {id} = req.params

    try {
        const cities = await citiesModel.findOne({
            where: {id}
        });
        if (!cities) {
            return res.status(404).json({ message: 'Could not find data'})
        }
        
        res.status(200).json(cities);
    }catch (error) {
        console.error(`Could not fetch cities: ${error}`)
        res.status(500).json({ error: error.message })
    }
});

//*CREATE
citiesController.post('/cities', async (req, res) => {
    const { zipcode, name } = req.body;

    if (!zipcode || !name ) {
        return res.status(400).json({ message: 'Missing data required'});
    }

    try {
        const cities = await citiesModel.create({
            zipcode,
            name
        })

        res.status(201).json({ message: 'Cities created successfully', cities})
    } catch (error) {
        res.status(500).json({ message: `Could not create cities ${error}`})
    }
})

//*UPDATE
citiesController.put('/cities', async (req, res) => {
    const { id, zipcode, name } = req.body;

    if (!id || !zipcode || !name ) {
        return res.status(400).json({ message: 'Missing required data'})
    }
    try {
        const result = await citiesModel.update({
            zipcode,
            name
        }, {
            where: {id}
        })
        if (result === 0) {
            return res.status(404).json({ message: 'Cities not found or no changes made'})
        }
            return res.status(200).json({ message: 'Cities updated successfully'})
    } catch (error) {
        return res.json({ message: `Could not update cities ${error}`})
    }
})

//*DELETE
citiesController.delete('/cities/:id', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await citiesModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message: `Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete cities: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})