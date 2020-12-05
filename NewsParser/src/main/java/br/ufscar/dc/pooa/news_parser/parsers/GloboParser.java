package br.ufscar.dc.pooa.news_parser.parsers;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import br.ufscar.dc.pooa.news_parser.models.News;

public class GloboParser extends Parser {
    static final String URL = "https://www.globo.com";
    
    public void parse() {
        try {
            Document doc = Jsoup.connect(URL).get();
            Elements titles = doc.select("p.hui-premium__title");
            for (Element t : titles) {
                Element parent = t.parent();
                String title = t.text();
                String type = "Primary";
                String url = "";
                
                while (parent != null && !parent.tagName().equals("a")) {
                    parent = parent.parent();
                }
                
                if (parent != null && parent.tagName().equals("a")) {
                    url = parent.attr("href");
                }
                
                this.addNews(new News(title, url, type));
            }   
        } catch (IOException exception) {
            System.out.println("Unable to connect:");
            System.out.println(exception.getMessage());
        }
    }
}