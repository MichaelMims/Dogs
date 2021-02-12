import axios from 'axios'
import cheerio from 'cheerio'
import { AdoptionAgency, CORSPROXY, Pet } from '../../utils/utils'

export class HoustonHumane implements AdoptionAgency {
    agencyName = "Houston Humane Society"
    base_url = ""
    url = "https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals2.aspx?species=Dog&gender=A&agegroup=All&location=&site=&onhold=A&orderby=Name&colnum=3&css=&authkey=hxym4cn4tnbm0ys26jo20ebskdhb1t3wyfgabvt03wqup07vcd&recAmount=&detailsInPopup=Yes&featuredPet=Include&stageID="

    async getPets(): Promise<Pet[]> {
        let pet_array: Pet[] = []
        let hasNextPage: boolean = false
        let nextPageUrl: any = this.url

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

                    $('.list-item').each((index, element) => {
                        let image_url: string | undefined
                        let detail_url: string | undefined
                        let pet_name = ""
                        let breed = ""
                        let sex = ""
                        let weight = ""
                        let age = ""

                        $(element).each((ind, ele) => {
                            pet_name = $(ele).find('.list-animal-name').text() || 'N/A'
                            image_url = $(ele).find('.list-animal-photo').attr('src') || 'N/A'
                            sex = $(ele).find('.list-animal-sexSN').text() || 'N/A'
                            breed = $(ele).find('.list-animal-breed').text() || 'N/A'
                            age = $(ele).find('.list-animal-age').text() || 'N/A'
                            weight = "N/A"

                            let detailPageRegex = /javascript:poptastic\(\'|\&css\=\&PopUp\=true\'\)\;/g
                            detail_url = $(ele).find('.list-animal-name a').attr('href') !== undefined
                                ? `https://ws.petango.com/webservices/adoptablesearch/${$(ele).find('.list-animal-name a').attr('href')?.replace(detailPageRegex, '')}`
                                : "N/A"
                        })




                        let pet: Pet = {
                            name: pet_name,
                            breed: breed,
                            sex: sex,
                            age: age,
                            weight: weight,
                            image: image_url,
                            url: detail_url,
                            agency: 'Houston Humane'
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
}