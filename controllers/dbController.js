import express from 'express'
import sequelize from '../config/sequelizeConfig.js'

export const dbController = express.Router()

dbController.get('/sync', async (req, res) => {
    try {
        const result = await sequelize.sync({force: true })
        res.send('Database successfully synchronized')
    }catch (error) {
        console.error(`Synchronization error: ${error}`);
        
    }
})