import Pokemon from "./Pokemon"

async function run () {
    const pokemonName = process.argv[2]
    if(pokemonName) {
        const pokemon = new Pokemon(pokemonName)
        await pokemon.fetchPokemon()
        pokemon.printPokemon()
        if (process.argv[3] === 'csv') {
            pokemon.appendCSV()
        }
    } else {
        console.log('pokemon name required')
    }
}

run()