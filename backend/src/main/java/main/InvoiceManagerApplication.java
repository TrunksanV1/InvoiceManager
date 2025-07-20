package main;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import config.CompanyProperties;


@SpringBootApplication
@EnableConfigurationProperties(CompanyProperties.class)
public class InvoiceManagerApplication {
    public static void main(String[] args) {
        var app = SpringApplication.run(InvoiceManagerApplication.class, args);
        System.out.println(app.getBean(CompanyProperties.class).getName());
    }
}
