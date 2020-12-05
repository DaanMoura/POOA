package br.ufscar.dc.pooa.news_parser.parsers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import br.ufscar.dc.pooa.news_parser.models.News;

public abstract class Parser {
    private String dateNow = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss").format(LocalDateTime.now());
    private List<News> news = new ArrayList<News>();
    
    public String getDateNow() {
        return dateNow;
    }

    public List<News> getNews() {
        return this.news;
    }

    public void addNews(News news) {
        this.news.add(news);
    }

    public void print() {
        System.out.println(this.getDateNow() + "\n");
        for (News news : this.news) {
            System.out.println("Title: " + news.getTitle());
            System.out.println("URL: " + news.getUrl());
            System.out.println("Type: " + news.getType());
            System.out.println();
        }
    }

    public abstract void parse();
}