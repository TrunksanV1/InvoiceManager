package main.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import config.CompanyProperties;

@RestController
public class CompanyController {
    private final CompanyProperties companyProperties;

    public CompanyController(CompanyProperties companyProperties) {
        this.companyProperties = companyProperties;
    }

    @RequestMapping("/company")
    public CompanyProperties getCompanyInfo() {
        return this.companyProperties;
    }

}
