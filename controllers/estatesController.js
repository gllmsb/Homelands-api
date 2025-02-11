import express from 'express'
import { estatesModel } from '../models/estatesModel.js'

export const estatesController = express.Router()


//*GET ALL estates
estatesController.get('/estates', async (req, res) => {
    try {
        const estates = await estatesModel.findAll();

        if (!estates || estates.length === 0) {
            res.json({ message: 'No data found '});
        }
        res.json(estates)
    } catch (error) {
        console.error(`Could not get estates: ${error}`)
    }
});

//* GET DETAILS
estatesController.get('/estates/:id', async (req, res) => {
    const {id} = req.params

    try {
        const estates = await estatesModel.findOne({
            where: {id}
        });
        if (!estates) {
            return res.status(404).json({ message: 'Could not find data'})
        }
        
        res.status(200).json(estates);
    }catch (error) {
        console.error(`Could not fetch estates: ${error}`)
        res.status(500).json({ error: error.message })
    }
});

//*CREATE
estatesController.post('/estates', async (req, res) => {
    console.log(req.body)
    
    const { address, price, payout, gross, net, cost, num_rooms, num_floors, floor_space, ground_space, basement_space, year_of_construction, year_rebuilt, description, floorplan, num_clicks, city_id, type_id, energy_label_id } = req.body;

    if (!address || !price || !payout || !gross || !net || !cost || !num_rooms || !num_floors || !floor_space || !ground_space || !basement_space || !year_of_construction || !year_rebuilt || !description || !floorplan || !num_clicks || !city_id || !type_id || !energy_label_id ) {
        return res.status(400).json({ message: 'Missing data required'});
    }

    try {
        const estates = await estatesModel.create({
            address,
            price,
            payout,
            gross,
            net,
            cost,
            num_rooms,
            num_floors,
            floor_space,
            ground_space,
            basement_space,
            year_of_construction,
            year_rebuilt,
            description,
            floorplan,
            num_clicks,
            city_id,
            type_id,
            energy_label_id
        })

        res.status(201).json({ message: 'estates created successfully', estates})
    } catch (error) {
        res.status(500).json({ message: `Could not create estates ${error}`})
    }
})

//*UPDATE
estatesController.put('/estates', async (req, res) => {
    const {id, address, price, payout, gross, net, cost, num_rooms, num_floors, floor_space, ground_space, basement_space, year_of_construction, year_rebuilt, description, floorplan, num_clicks, city_id, type_id, energy_label_id } = req.body;

    if (!id || !address || !price || !payout || !gross || !net || !cost || !num_rooms || !num_floors || !floor_space || !ground_space || !basement_space || !year_of_construction || !year_rebuilt || !description || !floorplan || !num_clicks || !city_id || !type_id || !energy_label_id ) {
        return res.status(400).json({ message: 'Missing required data'})
    }
    try {
        const result = await estatesModel.update({
            address,
            price,
            payout,
            gross,
            net,
            cost,
            num_rooms,
            num_floors,
            floor_space,
            ground_space,
            basement_space,
            year_of_construction,
            year_rebuilt,
            description,
            floorplan,
            num_clicks,
            city_id,
            type_id,
            energy_label_id
        }, {
            where: {id}
        })
        if (result === 0) {
            return res.status(404).json({ message: 'estates not found or no changes made'})
        }
            return res.status(200).json({ message: 'estates updated successfully'})
    } catch (error) {
        return res.json({ message: `Could not update estates ${error}`})
    }
})

//*DELETE
estatesController.delete('/estates/:id', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await estatesModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message: `Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete estates: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})