Programação Orientada a Objetos Avançada - UFSCar 2020<br>
Trabalho 2 <br>
Professor: Daniel Lucrédio <br>
Autor: Daniel Lucio Masselani de Moura

# NewsParser

An extensible news extractor in Java.


## Como rodar

Execute:
```
./run.sh <parser> <function>...
```

onde ``<parser>`` é qual parser você quer utilizar (globo, ny-times, nerdbunker) e ``<function>`` é qual função você deseja aplicar nas notícias extraídas (print, csv). É possível passar mais de uma função na linha de comando.

### Exemplo:

```
./run.sh nerdbunker print csv
```

Esse comando irá extrair as notícias da página principal do [NerdBunker](https://jovemnerd.com.br/nerdbunker/), imprimir na tela e salvar num arquivo CSV.
## Como compilar

Verifique se você tem o [Maven](https://maven.apache.org/) instalado e execute:
```
./install.sh
```

## Como extender a aplicação

### Adicionando um novo site 

Para adicionar um novo parser, você deve criar uma classe em [``parsers``](src/main/java/br/ufscar/dc/pooa/news_parser/parsers) extentendo a classe [``Parser``](src/main/java/br/ufscar/dc/pooa/news_parser/parsers/Parser.java). E depois sobrescrever o método ``parse`` para implementar a extração das notícias respeitando as particularidades do site e inserindo utilizando o método ``addNews``.

```java
public class ExampleParser extends Parser {
    @Override
    public void parse() {
        // ...
        // For each news insert with:
        this.addNews(new News(title, url, type, sourceName))
    }
}
```

Após criar a classe do parser basta registrar em [``ParserRegister``](src/main/java/br/ufscar/dc/pooa/news_parser/parsers/ParserRegister.java) como mostrado no exemplo abaixo:

```java
// parsers/ParserRegister.java
package br.ufscar.dc.pooa.news_parser.parsers;

import java.util.HashMap;
import java.util.Map;

public class ParserRegister {

    public static Parser get(String parserName) {
        Map<String, Parser> parsers = new HashMap<String, Parser>();

        // Register parsers here
        parsers.put("globo", new GloboParser());
        parsers.put("ny-times", new NewYorkTimesParser());
        parsers.put("nerdbunker", new NerdBunkerParser());
        parsers.put("example", new ExampleParser()); // Your new parser

        if (!parsers.containsKey(parserName)) {
            System.out.println(parserName + " is not available");
            System.out.println("Available parsers: ");
            for(String key : parsers.keySet()) {
                System.out.println(key);
            }
            System.exit(1);
        } 

        return parsers.get(parserName);
    } 
```

### Adicionando uma nova função
Para adicionar uma nova função, você deve criar uma classe em [``functions``](src/main/java/br/ufscar/dc/pooa/news_parser/functions) extendendo a classe a classe [``Function``](src/main/java/br/ufscar/dc/pooa/news_parser/functions/Function.java). E depois sobrescrever o método ``run`` que recebe uma lista de notícias. Nesse método você pode implementar a função que desejar.

```java
public class ExampleFunction extends Function {
    @Override
    public void run(List<News> newsList) {
       // Write your function here
    }
}
```

Após criar a classe do parser basta registrar em [``FunctionsRegister``](src/main/java/br/ufscar/dc/pooa/news_parser/parsers/FunctionsRegister.java) como mostrado no exemplo abaixo:

```java
// parsers/FunctionsRegister.java
package br.ufscar.dc.pooa.news_parser.functions;

import java.util.HashMap;
import java.util.Map;

public class FunctionsRegister {

    public static Function get(String functionName) {
        Map<String, Function> parsers = new HashMap<String, Function>();

        // Register functions here
        parsers.put("print", new PrintFunction());
        parsers.put("csv", new CsvFunction());
        parsers.put("example", new ExampleFunction()); // Your new function

        if (!parsers.containsKey(functionName)) {
            System.out.println(functionName + " is not available");
            System.out.println("Available functions: ");
            for(String key : parsers.keySet()) {
                System.out.println(key);
            }
            System.exit(1);
        } 

        return parsers.get(functionName);
    } 
}
```