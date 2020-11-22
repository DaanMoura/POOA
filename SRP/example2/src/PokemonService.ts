import axios, { AxiosInstance } from 'axios'
import Pokemon from './Pokemon'

export default class PokemonService {
    private static api: AxiosInstance = axios.create({
        baseURL: 'https://pokeapi.co/api/v2'
    })

    private static async getDescription(pokemonId: number): Promise<string> {
        const result = await this.api.get('/pokemon-species/' + pokemonId)
        if (result.status === 200) {
            return result.data.flavor_text_entries
                .find(text => text.language.name === 'en').flavor_text as string
        } else {
            console.error('Unable to fetch pokemon description')
            return ''
        }
    }

    static async fetchPokemon(name: string): Promise<Pokemon> {
        const result = await this.api.get('/pokemon/' + name)
        if (result.status === 200) {
            const pokemonData = result.data
            const description = await this.getDescription(pokemonData.id)

            return {
                name,
                description,
                type: pokemonData.types[0].type.name,
                hp: pokemonData.stats[0].base_stat,
                attack: pokemonData.stats[1].base_stat,
                defense: pokemonData.stats[2].base_stat,
                specialAttack: pokemonData.stats[3].base_stat,
                specialDefense: pokemonData.stats[4].base_stat,
                speed: pokemonData.stats[5].base_stat,
            }
        } else {
            console.error('Unable to fetch pokemon')
            process.exit(1)
        }
    }
}