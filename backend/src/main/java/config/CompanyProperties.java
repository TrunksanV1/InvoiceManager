package config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "company")
public class CompanyProperties {
    private String name;
    private String siret;
    private String adress;
    private String postalCode;
    private String city;    
    private String phone;
    private String email;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getSiret() {
        return siret;
    }
    public void setSiret(String siret) {
        this.siret = siret;
    }
    public String getAdress() {
        return adress;
    }
    public void setAdress(String adress) {
        this.adress = adress;
    }
    public String getPostalCode() {
        return postalCode;
    }
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
}
