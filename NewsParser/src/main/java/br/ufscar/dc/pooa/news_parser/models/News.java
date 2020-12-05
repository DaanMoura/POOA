package br.ufscar.dc.pooa.news_parser.models;

public class News {
    private String title;
    private String url;
    private String type;

    public News(String title,  String url, String type) {
        this.title = title;
        this.url = url;
        this.type = type;
    }

    public String getTitle() {
        return this.title;
    }

    public String getUrl() {
        return this.url;
    }

    public String getType() {
        return this.type;
    } 
}