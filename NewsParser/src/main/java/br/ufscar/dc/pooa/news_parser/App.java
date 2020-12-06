package br.ufscar.dc.pooa.news_parser;

import java.util.List;

import br.ufscar.dc.pooa.news_parser.functions.Function;
import br.ufscar.dc.pooa.news_parser.functions.FunctionsRegister;
import br.ufscar.dc.pooa.news_parser.models.News;
import br.ufscar.dc.pooa.news_parser.parsers.Parser;
import br.ufscar.dc.pooa.news_parser.parsers.ParserRegister;


/**
 * Programação Orientada a Objetos Avançada - UFSCar 2020
 * Trabalho 2
 * Professor: Daniel Lucrédio
 * Autor: Daniel Lucio Masselani de Moura
 *
 */
public class App 
{

    public static void main( String[] args ) {
        try {
            Parser parser = ParserRegister.get(args[0]);
            parser.parse();
            List<News> newsList = parser.getNews();

            for(int i = 1; i < args.length; i++) {
                String functionName = args[i];
                Function function = FunctionsRegister.get(functionName);
                function.run(newsList);
            }

        } catch(ArrayIndexOutOfBoundsException exception) {
            System.out.println("Missing arguments");
        }
        
    }
}
