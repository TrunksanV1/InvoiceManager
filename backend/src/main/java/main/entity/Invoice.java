package main.entity;

import jakarta.persistence.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Invoice {
    @Id
    private int id;
    
    @ManyToOne
    @JoinColumn(name = "client_id",nullable = false)
    private Client client;

    private Date date;
    private double amount;
    private String status;
    private String departure;
    private String arrival;
    @JsonProperty("b_f")
    private boolean b_f;
    private boolean tva;
    private int tva_rate;
    private String greeting;

    public Invoice() {
        // Default constructor
    }

    public Invoice(int id, Client client, Date date, double amount, String status, String departure, String arrival, boolean b_f, boolean tva, int tva_rate, String greeting) {
        this.id = id;
        this.client = client;
        this.date = date;
        this.amount = amount;
        this.status = status;
        this.departure = departure;
        this.arrival = arrival;
        this.b_f = b_f;
        this.tva = tva;
        this.tva_rate = tva_rate;
        this.greeting = greeting;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Client getClient() {
        return client;
    }
    public void setClient(Client client) {
        this.client = client;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getDeparture() {
        return departure;
    }
    public void setDeparture(String departure) {
        this.departure = departure;
    }
    public String getArrival() {
        return arrival;
    }
    public void setArrival(String arrival) {
        this.arrival = arrival;
    }
    @JsonIgnore
    public boolean isB_f() {
        return b_f;
    }
    @
    public void setB_f(boolean b_f) {
        this.b_f = b_f;
    }
    public boolean isTva() {
        return tva;
    }
    public void setTva(boolean tva) {
        this.tva = tva;
    }
    public int getTva_rate() {
        return tva_rate;
    }
    public void setTva_rate(int tva_rate) {
        this.tva_rate = tva_rate;
    }
    public String getGreeting() {
        return greeting;
    }
    public void setGreeting(String greeting) {
        this.greeting = greeting;
    }
    

}

