package br.ufscar.dc.pooa.news_parser.functions;

import java.util.HashMap;
import java.util.Map;

public class FunctionsRegister {

    public static Function get(String functionName) {
        Map<String, Function> parsers = new HashMap<String, Function>();

        // Register functions here
        parsers.put("print", new PrintFunction());
        parsers.put("csv", new CsvFunction());

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
