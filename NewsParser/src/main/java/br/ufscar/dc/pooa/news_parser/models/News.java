package br.ufscar.dc.pooa.news_parser.models;

public class News {
    private String title;
    private String url;
    private String type;
    private String source;

    /**
     * 
     * @param title - News headline
     * @param url - URL to get full news
     * @param type - Type of the news on the page
     * @param source - Source of the news
     */
    public News(String title,  String url, String type, String source) {
        this.title = title;
        this.url = url;
        this.type = type;
        this.source = source;
    }

    /** News headline */    
    public String getTitle() {
        return this.title;
    }

    /** URL to get full news */
    public String getUrl() {
        return this.url;
    }

    /** Type of the news on the page */
    public String getType() {
        return this.type;
    }

    /** Source of the news */
    public String getSource() {
        return this.source;
    }
}