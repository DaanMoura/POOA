package br.ufscar.dc.pooa.news_parser.functions;

import java.util.List;

import br.ufscar.dc.pooa.news_parser.models.News;

public class PrintFunction extends Function {
    @Override
    public void run(List<News> newsList) {
        if (newsList.size() > 0) {
            String source = newsList.get(0).getSource();
            System.out.printf("%d news from %s\n\n", newsList.size(), source);
            for (News news : newsList) {
                System.out.println("Title: " + news.getTitle());
                System.out.println("URL: " + news.getUrl());
                System.out.println("Type: " + news.getType());
                System.out.println();
            }
        } else {
            System.out.println("Unable to find news");
        }
    }
}
