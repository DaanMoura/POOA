export default class ArgumentParser {
    static getArguments(): [string, boolean] {
        const pokemonName = process.argv[2]
        if (!pokemonName) {
            console.log('pokemon name is required')
            process.exit(1)
        }

        const csv = Boolean(process.argv[3] === 'csv')

        return [pokemonName, csv]
    } 
}