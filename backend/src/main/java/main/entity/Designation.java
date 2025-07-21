package main.entity;

import jakarta.persistence.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Designation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
    private String departure;
    private String arrival;

    @JsonProperty
    private String b_f;

    private String name; 
    
    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    @JsonIgnore // to prevent infinite loop on serialization
    private Invoice invoice;

    private double amount;

    public Designation() {
        // Default constructor
    }

    public Designation(Date date, String departure, String arrival, String b_f, double amount,String name) {
        this.date = date;
        this.departure = departure;
        this.arrival = arrival;
        this.b_f = b_f;
        this.amount = amount;
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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
    public String getBf() {
        return b_f;
    }

    @JsonIgnore
    public void setBf(String b_f) {
        this.b_f = b_f;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

}
