package br.ufscar.dc.pooa.news_parser.functions;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import br.ufscar.dc.pooa.news_parser.models.News;

public class CsvFunction extends Function {
    @Override
    public void run (List<News> newsList) {
        String sourceName = newsList.get(0).getSource().replace(" ", "_");
        String dateNow = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss").format(LocalDateTime.now());

        try (PrintWriter pw = new PrintWriter(new FileWriter(new File(sourceName + dateNow + ".csv")))) {
            pw.println("Source,Title,URL,Type");
            for(News news : newsList) {
                String source = news.getSource();
                String title = news.getTitle();
                String url = news.getUrl();
                String type = news.getType();
                pw.printf("%s,\"%s\",%s,%s\n", source, title, url, type);
            }
        } catch (IOException exception) {
            System.out.println("Unable to write file:");
            System.out.println(exception.getMessage());
        }
    }
}
