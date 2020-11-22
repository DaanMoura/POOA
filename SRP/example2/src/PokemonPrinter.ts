import Pokemon from "./Pokemon";

export default class PokemonPrinter {
    static print(pokemon: Pokemon) {
        console.log(`==== ${pokemon.name.toUpperCase()} ====`)
        console.log('type: ', pokemon.type)
        console.log('description: ', pokemon.description)
        console.log('hp: ', pokemon.hp)
        console.log('attack: ', pokemon.attack)
        console.log('defense: ', pokemon.defense)
        console.log('special attack: ', pokemon.specialAttack)
        console.log('special defense: ', pokemon.specialDefense)
        console.log('speed: ', pokemon.speed)
    }
}