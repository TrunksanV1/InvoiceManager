package main.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Client {
    @Id
    @JsonProperty("client_id") 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int client_id;

    private String name;
    private String lastName;
    private String incorporation;
    private String email;
    private String adress;
    private String postalCode;
    private String city;

    public Client() {
        // Default constructor
    }

    public Client(int client_id, String name, String lastName, String incorporation, String email, String adress, String postalCode, String city) {
        this.client_id = client_id;
        this.name = name;
        this.lastName = lastName;
        this.incorporation = incorporation;
        this.email = email;
        this.adress = adress;
        this.postalCode = postalCode;
        this.city = city;
    }

    // Getters and Setters
    @JsonIgnore
    public int getClientId() {
        return client_id;
    }       
    @JsonIgnore
    public void setClientId(int client_id) {
        this.client_id = client_id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getIncorporation() {
        return incorporation;
    }
    public void setIncorporation(String incorporation) {
        this.incorporation = incorporation;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
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


}
