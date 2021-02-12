import express from 'express';
import cors from 'cors';
import cron from 'cron';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { getAllPets } from './sites/sites';
import {Pet, PetData} from './utils/utils';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

let pets_data: PetData = {
    array: [],
    last_modified: new Date
}

var get_pets_job = new cron.CronJob(
    '0 * * * *', () => {
        getAllPets()
        .then((pets) => {
            if (pets) {
                pets_data.array = pets
                pets_data.last_modified = new Date
            }
        })
})

let program = () => {
    getAllPets()
    .then((pets) => {
        if (pets) {
            pets_data.array = pets
            pets_data.last_modified = new Date
        }
    })

    get_pets_job.start();

    app.use(morgan('combined'))
    app.use(cors())
    
    app.use('/pets', (req, res, next) => {
            return res.status(200).json({
                last_modified: pets_data.last_modified,
                count: pets_data.array.length,
                pets: pets_data.array.map((pet) => {return pet}),
                
            })
        });
        
    app.listen(PORT, () => {console.log(`listening on Port: ${PORT}`)})
}

program()