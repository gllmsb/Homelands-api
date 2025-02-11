import express from 'express'
import { reviewsModel } from '../models/reviewsModel.js'

export const reviewsController = express.Router()


//*GET ALL reviews
reviewsController.get('/reviews', async (req, res) => {
    try {
        const reviews = await reviewsModel.findAll();

        if (!reviews || reviews.length === 0) {
            res.json({ message: 'No data found '});
        }
        res.json(reviews)
    } catch (error) {
        console.error(`Could not get reviews: ${error}`)
    }
});

//* GET DETAILS
reviewsController.get('/reviews/:id', async (req, res) => {
    const {id} = req.params

    try {
        const reviews = await reviewsModel.findOne({
            where: {id}
        });
        if (!reviews) {
            return res.status(404).json({ message: 'Could not find data'})
        }
        
        res.status(200).json(reviews);
    }catch (error) {
        console.error(`Could not fetch reviews: ${error}`)
        res.status(500).json({ error: error.message })
    }
});

//*CREATE
reviewsController.post('/reviews', async (req, res) => {
    const { subject, comment, num_stars, date, estate_id, user_id, is_active } = req.body;

    if (!subject || !comment || !num_stars || !date || !estate_id || !user_id || !is_active) {
        return res.status(400).json({ message: 'Missing data required'});
    }

    try {
        const reviews = await reviewsModel.create({
            subject,
            comment,
            num_stars,
            date,
            estate_id,
            user_id,
            is_active
        })

        res.status(201).json({ message: 'reviews created successfully', reviews})
    } catch (error) {
        res.status(500).json({ message: `Could not create reviews ${error}`})
    }
})

//*UPDATE
reviewsController.put('/reviews', async (req, res) => {
    const { id, subject, comment, num_stars, date, estate_id, user_id, is_active } = req.body;

    if (!id || !subject || !comment || !num_stars || !date || !estate_id || !user_id || !is_active ) {
        return res.status(400).json({ message: 'Missing required data'})
    }
    try {
        const result = await reviewsModel.update({
            subject,
            comment,
            num_stars,
            date,
            estate_id,
            user_id,
            is_active
        }, {
            where: {id}
        })
        if (result === 0) {
            return res.status(404).json({ message: 'reviews not found or no changes made'})
        }
            return res.status(200).json({ message: 'reviews updated successfully'})
    } catch (error) {
        return res.json({ message: `Could not update reviews ${error}`})
    }
})

//*DELETE
reviewsController.delete('/reviews/:id', async (req, res) => {
    const { id } = req.params;

    if(id) {
        try {
            await reviewsModel.destroy({
                where: { id }
            });

            res.status(200).send({
                message: `Deleted successfully`
            });
        } catch (error) {
            res.status(500).send({
                message: `Cannot delete reviews: ${error}`
            });
        }
    } else {
        res.status(400).send({
            message: `Invalid ID`
        })
    }
})