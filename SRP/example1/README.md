# Exemplo 1

Uma aplicação de linha de comando que busca informações de um pokémon, sem utilizar o Princípio da Responsabilidade Única.

## Como rodar

1. Instalar dependencias
```
npm install
``` 

ou

```
yarn install
```

2. Executar aplicação
```
npm run pokemon <pokemonName> [csv]
```

ou

```
yarn pokemon <pokemonName> [csv]
```

## Exemplo:

```
$ yarn pokemon ditto

==== DITTO ====
type:  normal
description:  It can freely recombine its own cellular structure to
transform into other life-forms.
hp:  48
attack:  48
defense:  48
special attack:  48
special defense:  48
speed:  48
Done in 2.96s.
```

E para adicionar no arquivo CSV, adicione ``csv`` no fim do comando
```
$ yarn pokemon psyduck csv

==== PSYDUCK ====
type:  water
description:  While lulling its
enemies with its
vacant look, this
                 wily POKéMON will
use psychokinetic
powers.
hp:  50
attack:  52
defense:  48
special attack:  65
special defense:  50
speed:  55
```
