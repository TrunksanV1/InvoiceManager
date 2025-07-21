package main.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    private Date date;
    private String status;
    private boolean tva;
    private int tva_rate;
    private String greeting;
    private String object;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Designation> designations = new ArrayList<>();

    public Invoice() {}

    public Invoice(int id, Client client, Date date, String status, boolean tva, int tva_rate, String greeting,String object) {
        this.id = id;
        this.client = client;
        this.date = date;
        this.status = status;
        this.tva = tva;
        this.tva_rate = tva_rate;
        this.greeting = greeting;
        this.object = object;
    }

    // Add methods to manage designations
    public void addDesignation(Designation designation) {
        designations.add(designation);
        designation.setInvoice(this);
    }

    public void removeDesignation(Designation designation) {
        designations.remove(designation);
        designation.setInvoice(null);
    }

    // Getters and Setters

    public List<Designation> getDesignations() {
        return designations;
    }

    public void setDesignations(List<Designation> designations) {
        this.designations = designations;
        // Make sure to set this invoice reference on each designation
        for (Designation d : designations) {
            d.setInvoice(this);
        }
    }

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
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
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

