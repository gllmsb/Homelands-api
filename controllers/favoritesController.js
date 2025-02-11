import express from 'express'
import { favoritesModel } from '../models/favoritesModel.js'

export const favoritesController = express.Router()


//*GET ALL favorites
favoritesController.get('/favorites', async (req, res) => {
    try {
        const favorites = await favoritesModel.findAll();

        if (!favorites || favorites.length === 0) {
            res.json({ message: 'No data found '});
        }
        res.json(favorites)
    } catch (error) {
        console.error(`Could not get favorites: ${error}`)
    }
});

//* GET DETAILS
favoritesController.get('/favorites/:id', async (req, res) => {
    const {id} = req.params

    try {
        const favorites = await favoritesModel.findOne({
            where: {id}
        });
        if (!favorites) {
            return res.status(404).json({ message: 'Could not find data'})
        }
        
        res.status(200).json(favorites);
    }catch (error) {
        console.error(`Could not fetch favorites: ${error}`)
        res.status(500).json({ error: error.message })
    }
});

//*CREATE
favoritesController.post('/favorites', async (req, res) => {
    const { user_id, estate_id} = req.body;

    if (!user_id || !estate_id ) {
        return res.status(400).json({ message: 'Missing data required'});
    }

    try {
        const favorites = await favoritesModel.create({
            user_id,
            estate_id
        })

        res.status(201).json({ message: 'favorites created successfully', favorites})
    } catch (error) {
        res.status(500).json({ message: `Could not create favorites ${error}`})
    }
})

//*UPDATE
favoritesController.put('/favorites', async (req, res) => {
    const { id, user_id, estate_id} = req.body;

    if (!id || !user_id || !estate_id) {
        return res.status(400).json({ message: 'Missing required data'})
    }
    try {
        const result = await favoritesModel.update({
            user_id,
            estate_id
        }, {
            where: {id}
        })
        if (result === 0) {
            return res.status(404).json({ message: 'favorites not found or no changes made'})
        }
            return res.status(200).json({ message: 'favorites updated successfully'})
    } catch (error) {
        return res.json({ message: `Could not update favorites ${error}`})
    }
})

//*DELETE
favoritesController.delete('/favorites/:id', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await favoritesModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message: `Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete favorites: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})