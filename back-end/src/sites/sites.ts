import {HSPCA} from './model/hscpa'
import {HoustonHumane} from './model/houstonhumane'
import {AdoptionAgency, Pet} from '../utils/utils'

export async function getAllPets(){
    let pets: Pet[] = []
    let agencies: AdoptionAgency[] = [new HSPCA, new HoustonHumane]
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