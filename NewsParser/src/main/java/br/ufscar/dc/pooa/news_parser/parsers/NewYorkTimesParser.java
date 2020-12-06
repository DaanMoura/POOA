package br.ufscar.dc.pooa.news_parser.parsers;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import br.ufscar.dc.pooa.news_parser.models.News;

public class NewYorkTimesParser extends Parser {
    static final String URL = "https://www.nytimes.com/";
    static final String sourceName = "New York Times";

    @Override
    public void parse() {
        try {
            Document doc = Jsoup.connect(URL).get();
            Elements titles = doc.select("h2[class*=css-1ayculb]");
            for (Element t : titles) {
                Element parent = t.parent();
                String title = t.text();
                String type = "Main";
                String url = "";
                
                while (parent != null && !parent.tagName().equals("a")) {
                    parent = parent.parent();
                }
                
                if (parent != null && parent.tagName().equals("a")) {
                    url = URL + parent.attr("href").substring(1);
                }
                
                this.addNews(new News(title, url, type, sourceName));
            }   
        } catch (IOException exception) {
            System.out.println("Unable to connect:");
            System.out.println(exception.getMessage());
        }
    }
}