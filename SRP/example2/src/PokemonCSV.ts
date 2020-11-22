import Pokemon from "./Pokemon";
import * as path from 'path'
import { readFile, writeFile, } from 'fs'

export default class PokemonCSV {
    static append(pokemon: Pokemon) {
        const filePath = path.join(__dirname, '..', 'pokemons.csv')
        readFile(filePath, (err,data) => {
            if (err) {
                console.log('unable to read pokemons.csv')
            } else {
                let csv  = data.toString()
                const line = `${pokemon.name},${pokemon.type},"${pokemon.description}",${pokemon.hp},${pokemon.attack},` + 
                        `${pokemon.defense},${pokemon.specialAttack},${pokemon.specialDefense},${pokemon.speed}\n`
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