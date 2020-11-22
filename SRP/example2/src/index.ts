import ArgumentParser from "./ArgumentParser";
import PokemonCSV from "./PokemonCSV";
import PokemonPrinter from "./PokemonPrinter";
import PokemonService from "./PokemonService";

async function run () {
    const [pokemonName, csv] = ArgumentParser.getArguments()
    const pokemon = await PokemonService.fetchPokemon(pokemonName)
    PokemonPrinter.print(pokemon)
    if (csv) {
        PokemonCSV.append(pokemon)
    }
}

run()