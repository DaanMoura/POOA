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
}
