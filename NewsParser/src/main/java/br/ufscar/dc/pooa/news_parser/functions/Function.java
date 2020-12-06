package br.ufscar.dc.pooa.news_parser.functions;

import java.util.List;

import br.ufscar.dc.pooa.news_parser.models.News;

public abstract class Function {
    abstract public void run(List<News> newsList);
}
