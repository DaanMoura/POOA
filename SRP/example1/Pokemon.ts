import axios, { AxiosInstance } from 'axios'
import { readFile, writeFile } from 'fs'

export default class Pokemon {
    name: string
    type: string
    description: string
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
    private api: AxiosInstance

    constructor(name: string) {
        this.name = name.toLowerCase()
        this.api = axios.create({
            baseURL: 'https://pokeapi.co/api/v2'
        })
    }

    async fetchPokemon() {
        const result = await this.api.get('/pokemon/' + this.name)
        if (result.status === 200) {
            const pokemonData = result.data
            this.type = pokemonData.types[0].type.name
            this.hp = pokemonData.stats[0].base_stat
            this.attack = pokemonData.stats[1].base_stat
            this.defense = pokemonData.stats[2].base_stat
            this.specialAttack = pokemonData.stats[3].base_stat
            this.specialDefense = pokemonData.stats[4].base_stat
            this.speed = pokemonData.stats[5].base_stat

            const specieResult = await this.api.get(pokemonData.species.url)
            if (result.status === 200) {
                this.description = specieResult.data.flavor_text_entries
                    .find(text => text.language.name === 'en').flavor_text
            } else {
                console.error('Unable to fetch pokemon description')
                this.description = ''
            }
        } else {
            console.error('Unable to fetch pokemon')
        }
    }

    printPokemon() {
        console.log(`==== ${this.name.toUpperCase()} ====`)
        console.log('type: ', this.type)
        console.log('description: ', this.description)
        console.log('hp: ', this.hp)
        console.log('attack: ', this.attack)
        console.log('defense: ', this.defense)
        console.log('special attack: ', this.specialAttack)
        console.log('special defense: ', this.specialDefense)
        console.log('speed: ', this.speed)
    }

    appendCSV() {
        readFile('pokemons.csv', (err,data) => {
            if (err) {
                console.log('unable to read pokemons.csv')
            } else {
                let csv  = data.toString()
                const line = `${this.name},${this.type},"${this.description}",${this.hp},${this.attack},` + 
                        `${this.defense},${this.specialAttack},${this.specialDefense},${this.speed}\n`
                if(csv.startsWith('name')) {
                    csv = csv + line
                } else {
                    const header = 'name,type,description,hp,attack,defense,special attack,specialdefense,speed\n'
                    csv = csv + header + line
                }

                writeFile('pokemons.csv', csv, (err) => {
                    if (err) {
                        console.log('unable to write to pokemons.csv')
                    }
                })
            }
        })
    }
}