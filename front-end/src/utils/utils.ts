export type Pet = {
    name: string,
    breed?: string,
    sex?: string,
    age?: string,
    weight?: string,
    image?: string,
    url?: string,
    agency: string
}

export type ListProp = {
    pets: Pet[]
}

export type PetProp = {
    pet: Pet
}

export type LoadingProp = {
    message?: string
}

export interface AdoptionAgency {
    agencyName: string
    url: string
    getPets(): Promise<Pet[]>
}

export const CORSPROXY = {
    host: "https://cors-anywhere.herokuapp.com/",
    port: 443
} 