package br.ufscar.dc.pooa.news_parser.parsers;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import br.ufscar.dc.pooa.news_parser.models.News;

public class NerdBunkerParser extends Parser {
    static final String URL = "https://jovemnerd.com.br/nerdbunker/";
    static final String sourceName = "NerdBunker";

    private void insertTitles (Elements titles, String type) {
        for (Element t : titles) {
            String title = t.text();
            String url = t.attr("href");
            
            this.addNews(new News(title, url, type, sourceName));
        }   
    }
    
    @Override
    public void parse() {
        try {
            Document doc = Jsoup.connect(URL).get();
            Elements titles = doc.select("section.main-highlights h2.title > a");
            this.insertTitles(titles, "Main");

            titles = doc.select("section.main-content h2.title > a");
            this.insertTitles(titles, "Secondary");

        } catch (IOException exception) {
            System.out.println("Unable to connect:");
            System.out.println(exception.getMessage());
        }
    }
}