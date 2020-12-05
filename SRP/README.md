# Single Responsability Principle

O _Single Responsability Principle_ (SRP), em português, Princípio da Responsabilidade Única, é um dos 5 princípios SOLID, princípios de programação orientada a objetos que ajudam a manter e estender o código do software. 

O SRP diz que uma classe deve ter apenas uma responsabilidade, de uma forma prática, uma classe deve ter apenas uma razão para ser alterada. Diferentemente das _God Classes_, classes que implementam vários métodos e com várias responsabilidades, uma classe que respeita esse princípio deve ser focada em apenas um assunto.

A ilustração abaixo, extraída do artigo [The S.O.L.I.D Principles in Pictures](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898), demonstra a diferença de uma classe com várias responsabilidades de uma classe que respeita o Princípio da Responsabilidade Única.

![](https://miro.medium.com/max/1000/1*P3oONz9Da3Tc1w97fMV73Q.png)

## Como aplicar o princípio?

Para melhorar o entendimento desse princípio, será usado um projeto de uma aplicação que busca dados de um pokémon utilizando uma API Rest ([PokéAPI](https://pokeapi.co/)).

### Primeira versão

A primeira versão do projeto não segue o SRP. Ele é dividido em dois arquivos: [index.ts](example1/index.ts) e [Pokemon.ts](example1/Pokemon.ts)

Em [index.ts](example1/index.ts), é responsável por extrair os argumentos do comando e determinar o fluxo principal da aplicação.
```ts
// index.ts
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
```

E em [Pokemon.ts](example1/Pokemon.ts) determina os atributos do pokémon, faz a requisição na API, imprime as informações do pokémon no console e insere as informações desse pokémon num arquivo CSV.

```ts
// Pokemon.ts
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
        // ...
    }

    printPokemon() {
        // ...
    }

    appendCSV() {
        // ...
    }
}
```

Como é uma aplicação simples, essa classe pode parecer não ter problemas. Mas é notável que ela possui diversas responsabilidades, e ao momento que o programa aumenta, será mais difícil de manter esse código. O ideal seria separar essas diferentes responsabilidades em outras classes.

### Segunda Versão

Nessa versão, foi aplicado o Princípio da Responsabilidade Única, separando as responsabilidades da aplicação em diferentes classes.

O arquivo [Pokemon.ts](example2/src/Pokemon.ts) foi simplificada para uma interface TypeScript, apenas para definir os atributos do pokémon.
```ts
// src/Pokémon.ts
export default interface Pokemon {
    name: string
    type: string
    description: string
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}
```

A classe [PokemonService](example2/src/PokemonService.ts) é responsável por trazer as informações do Pokémon. Nesse exemplo, é buscado na API, mas caso desejar alterar a forma de obter o pokémon, é necessário alterar apenas essa classe.

```ts
// src/PokemonService.ts
import axios, { AxiosInstance } from 'axios'
import Pokemon from './Pokemon'

export default class PokemonService {
    private static api: AxiosInstance = axios.create({
        baseURL: 'https://pokeapi.co/api/v2'
    })

    private static async getDescription(pokemonId: number): Promise<string> {
       // ...
    }

    static async fetchPokemon(name: string): Promise<Pokemon> {
        // ...
    }
}

```

Repare também que esse princípio pode ser utilizado não só para classes, mas também para funções. Para obter a descrição do pokémon é necessário fazer a requisição em uma outra rota. No primeiro exemplo, essa requisição era implementado direto em ``fetchPokemon``, mas agora essa responsabilidade é do método ``getDescription``.

As funções de imprimir no console e adicionar no arquivo CSV, que antes fazia parte da classe [Pokemon](example1/Pokemon.ts) do primeiro exemplo, foram separadas em duas classes [PokemonPrinter](example2/src/PokemonPrinter.ts) e [PokemonCSV](example2/src/PokemonCSV.ts).

```ts
// src/PokemonPrinter.ts
export default class PokemonPrinter {
    static print(pokemon: Pokemon) {
        // ...
    }
}
```

```ts
// src/PokemonCSV.ts
export default class PokemonCSV {
    static append(pokemon: Pokemon) {
       // ...
    }
}
```

A extração de argumentos foi implementada na classe [ArgumentParser](example2/src/ArgumentParser.ts).

```ts
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
```

Agora o [index.ts](example2/src/index.ts) apenas cuida do fluxo da aplicação.
```ts
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
```
Nessa versão as responsabilidades estão devidamentes separas em suas classes, resultando num código mais limpo, de fácil manutenção, mais escalável e com baixo acoplamento.


