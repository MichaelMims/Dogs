import axios from 'axios'
import cheerio from 'cheerio'
import { AdoptionAgency, CORSPROXY, Pet } from '../../utils/utils'

export class HSPCA implements AdoptionAgency {
    agencyName = 'HSPCA'
    base_url = "https://www.houstonspca.org"
    url = "https://www.houstonspca.org/adopt/available-pets/?type=Dog"

    async getPets(): Promise<Pet[]> {
        let pet_array: Pet[] = []
        let hasNextPage: boolean = false
        let nextPageUrl: any  = this.url
        
        do {
            if (nextPageUrl !== undefined) {
                let response_data = 
                    await axios
                            .get(CORSPROXY.host + nextPageUrl,
                                {
                                    headers: {
                                        'X-Requested-With': 'something'
                                    }
                                }
                            )
                            .then(res => { 
                                return res.data 
                            })
                            .catch(err => { 
                                return console.log(err) 
                            })

                if (response_data !== null) {
                    const $ = cheerio.load(response_data)
                    
                    if ($('.next').attr('href') !== undefined) {
                        nextPageUrl = this.base_url + $('.next').attr('href')
                        hasNextPage = true
                    } else {
                        nextPageUrl = ""
                        hasNextPage = false
                    }
                    
                    $('.pet-card').each((index, element) => {
                        let image_url = $(element).find('.card__image').css('background-image').replace(/url\(|\)/g, '')
                        let detail_url = `https://www.houstonspca.org${$(element).attr('href')}`
                        let pet_name = $(element).find('.card__title').text()
                        let breed = ""
                        let sex = ""
                        let weight = ""
                        let age = ""
                        $(element).find('.card__text').each((ind, ele) => {
                            $(ele).find('div').each((i, e) => {
                                let text = $(e).text().replace(/\s+/g, ' ')
                                if (text.includes('Breed')) {
                                    breed = text.substr('Breed:'.length).trim() || 'N/A'
                                } else if (text.includes('Sex')) {
                                    sex = text.substr('Sex:'.length).trim() || 'N/A'
                                } else if (text.includes('Weight')) {
                                    weight = text.substr('Weight:'.length).trim() || 'N/A'
                                } else if (text.includes('Age')) {
                                    age = text.substr('Age:'.length).trim() || 'N/A'
                                }
    
                            })
                        })
                        let pet: Pet = {
                            name: pet_name,
                            breed: breed,
                            sex: sex,
                            age: age,
                            weight: weight,
                            image: image_url,
                            url: detail_url,
                            agency: 'HSPCA'
    
                        }
    
                        pet_array.push(pet)
                    })
                }
            }

        } while (hasNextPage)

        if (pet_array.length > 0) {
            return Promise.resolve(pet_array)
        } else {
            return Promise.reject(`No pets available at the ${this.agencyName}`)
        }
    }

    async getPetDetail(): Promise<string> {

        return ""
    }
}