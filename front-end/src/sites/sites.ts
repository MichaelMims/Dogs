import {HSPCA} from './model/hscpa'
import {HoustonHumane} from './model/houstonhumane'
import {AdoptionAgency, Pet} from '../utils/utils'

import mongoose from 'mongoose'

let pets: Pet[] = []
let agencies: AdoptionAgency[] = [new HSPCA, new HoustonHumane]

export async function getAllPets(){
    for (const agency of agencies) {
        await agency
            .getPets()
            .then((petsFromAgency:any ) => {
                petsFromAgency.forEach((pet: Pet) => pets.push(pet))
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    
    return pets
}