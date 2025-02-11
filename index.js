import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/sequelizeConfig.js'
import { citiesController } from './controllers/citiesController.js';
import { dbController } from './controllers/dbController.js';
import { energy_labelsController } from './controllers/energy_labelsController.js';
import { favoritesController } from './controllers/favoritesController.js';

dotenv.config()

const app = express();
const port = process.env.SERVERPORT || 4000;
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//*CONTROLLERS
app.use(dbController)
app.use(citiesController)
app.use(energy_labelsController)
app.use(favoritesController)

app.get("/", (req, res) => {
    res.send('Hello world')
})

app.get('*', (req, res) => {
    res.send('Could not find file');
    
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});