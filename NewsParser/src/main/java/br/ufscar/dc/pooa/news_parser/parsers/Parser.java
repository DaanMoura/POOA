package br.ufscar.dc.pooa.news_parser.parsers;

import java.util.ArrayList;
import java.util.List;

import br.ufscar.dc.pooa.news_parser.models.News;

public abstract class Parser {
    private List<News> news = new ArrayList<News>();

    public List<News> getNews() {
        return this.news;
    }

    public void addNews(News news) {
        this.news.add(news);
    }

    /** Parse news title, url and type */
    public abstract void parse();
}