package br.ufscar.dc.pooa.news_parser;

import br.ufscar.dc.pooa.news_parser.parsers.Parser;
import br.ufscar.dc.pooa.news_parser.parsers.GloboParser;
import br.ufscar.dc.pooa.news_parser.parsers.NewYorkTimesParser;

/**
 * Programação Orientada a Objetos Avançada - UFSCar 2020
 * Atividade 2
 * Professor: Daniel Lucrédio
 * Autor: Daniel Lucio Masselani de Moura
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        Parser parser = new NewYorkTimesParser();
        parser.parse();
        parser.print();
    }
}
